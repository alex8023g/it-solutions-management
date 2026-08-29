Создайте цифровую визитку, которая презентует Вас как специалиста, с обязательным использованием следующих технологий:

- Git;
- TypeScript;
- Node.js;
- NestJS;
- Prisma;
- GraphQL;
- Docker;
- Claude Code.

  Просим предоставить:
  1. Ссылку на проект (для просмотра);
  2. Ссылку на Git (для ознакомления с исходным кодом).

---

## Запуск через Docker

Требуется только Docker (с Docker Compose v2). Всё остальное — Node.js, база,
миграции и сиды — поднимается внутри контейнеров.

```bash
docker compose up --build
```

После сборки:

| Сервис | Адрес |
| --- | --- |
| Визитка (React + nginx) | http://localhost:8080 |
| GraphQL API (NestJS) | http://localhost:3000/graphql |
| Консоль CockroachDB | http://localhost:8081 |

Остановить и удалить данные базы: `docker compose down -v`.

### Что делает compose

- **db** — одноузловой CockroachDB (`start-single-node --insecure`) с
  постоянным томом `db-data`.
- **migrate** — разовая задача: применяет `prisma/migrations` через
  `prisma migrate deploy` и запускает сид. Оба шага идемпотентны, поэтому
  безопасно выполняются при каждом `up`. API стартует только после её успеха.
- **backend** — NestJS в production-режиме, непривилегированный пользователь
  `node`, healthcheck по `GET /`.
- **frontend** — статика Vite, собранная и отданная nginx. Запросы `/graphql`
  проксируются на `backend:3000`, поэтому браузер остаётся в том же origin —
  ровно как с dev-прокси Vite.

### Настройка

Все значения имеют дефолты, файл `.env` не обязателен. Чтобы переопределить —
скопируйте `.env.example` в `.env` (порты, `DATABASE_URL`, эндпоинт GraphQL).

Чтобы работать против облачного кластера Cockroach Cloud вместо локального,
укажите его строку подключения в `DATABASE_URL` и поднимайте только приложение:

```bash
docker compose up backend frontend
```

При `sslmode=verify-full` контейнеру нужен CA-сертификат кластера — пробросьте
его в домашний каталог пользователя `node`:

```yaml
    volumes:
      - ~/.postgresql/root.crt:/home/node/.postgresql/root.crt:ro
```

### Образы

`backend/Dockerfile` — многостадийный: зависимости → сборка (`prisma generate` +
`nest build`) → продакшн-зависимости → рантайм. Стадия `migrate` отдельная:
только ей нужны Prisma CLI (devDependency) и папка с миграциями, в рантайм-образ
они не попадают. `frontend/Dockerfile` собирает бандл и копирует его в
`nginx:alpine`; `VITE_GRAPHQL_ENDPOINT` — build-arg, так как Vite подставляет
`VITE_*` на этапе сборки.
