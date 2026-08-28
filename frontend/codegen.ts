import type { CodegenConfig } from '@graphql-codegen/cli'

// Types are generated from the schema NestJS emits at build time, so the
// frontend never needs a running backend to typecheck.
const config: CodegenConfig = {
  schema: '../backend/src/schema.gql',
  documents: ['src/**/*.{ts,tsx}', '!src/gql/**/*'],
  ignoreNoDocuments: true,
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        // Matches the frontend's `verbatimModuleSyntax` tsconfig setting.
        useTypeImports: true,
        scalars: {
          DateTime: 'string',
        },
      },
    },
  },
}

export default config
