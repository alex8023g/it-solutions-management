/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute or proxied URL of the GraphQL endpoint. */
  readonly VITE_GRAPHQL_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
