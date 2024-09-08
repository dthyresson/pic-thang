import type { FindTagQuery, FindTagQueryVariables } from 'types/graphql'

import { Metadata } from '@redwoodjs/web'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<FindTagQuery, FindTagQueryVariables> =
  gql`
    query FindTagQuery($id: Int!) {
      tag: tag(id: $id) {
        id
        name
        pics {
          id
          original
          processed
          description
        }
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<FindTagQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  tag,
}: CellSuccessProps<FindTagQuery, FindTagQueryVariables>) => {
  return (
    <>
      <Metadata title={`${tag.name} Tag`} description={`${tag.name} Tag`} />
      <div>
        <h1 className="mb-4 text-2xl font-bold">{tag.name}</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tag.pics.map((pic) => (
            <img key={pic.id} src={pic.original} alt={pic.description} />
          ))}
        </div>
      </div>
    </>
  )
}
