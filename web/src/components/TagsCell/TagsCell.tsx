import type { TagsQuery, TagsQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import { Error } from 'src/components/CellStates/Error'
import { Spinner } from 'src/components/CellStates/Spinner'

export const beforeQuery = (props: TagsQueryVariables) => {
  return {
    variables: props,
    pollInterval: 10_000,
  }
}

export const QUERY: TypedDocumentNode<TagsQuery, TagsQueryVariables> = gql`
  query TagsQuery {
    tags {
      id
      name
      pics {
        id
      }
    }
  }
`

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => <Error error={error} />

export const Loading = () => <Spinner />

export const Success = ({ tags }: CellSuccessProps<TagsQuery>) => {
  const picCounts = tags.map((tag) => tag.pics.length)
  const maxCount = Math.max(...picCounts)
  const binSize = maxCount / 5

  const getColorClass = (picCount: number) => {
    const bin = Math.min(Math.floor(picCount / binSize), 4)
    const colorClasses = [
      'bg-purple-400',
      'bg-purple-500',
      'bg-purple-600',
      'bg-purple-700',
      'bg-purple-800',
    ]
    return colorClasses[bin]
  }

  return (
    <>
      <Metadata title="Tags" description="Tags" />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const label =
            tag.pics.length > 1 ? `${tag.name} (${tag.pics.length})` : tag.name
          return (
            <Link
              className={`rounded-md p-4 text-white ${getColorClass(tag.pics.length)}`}
              key={`tag-${tag.id}-${tag.name}`}
              to={routes.tag({ id: tag.id })}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </>
  )
}
