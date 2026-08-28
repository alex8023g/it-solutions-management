import { useQuery } from '@apollo/client/react'
import { graphql } from '../gql'

const ApiStatusQuery = graphql(`
  query ApiStatus {
    status {
      message
      timestamp
    }
  }
`)

export function ApiStatus() {
  const { data, loading, error } = useQuery(ApiStatusQuery)

  if (loading) return <p className="api-status">Contacting the API…</p>
  if (error) return <p className="api-status">API unreachable: {error.message}</p>

  return (
    <p className="api-status">
      {data?.status.message} —{' '}
      <time dateTime={data?.status.timestamp}>
        {new Date(data!.status.timestamp).toLocaleTimeString()}
      </time>
    </p>
  )
}
