import gql from 'graphql-tag'
import * as ReactApolloHooks from 'react-apollo-hooks'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type ListMetadata = {
  __typename?: 'ListMetadata'
  count?: Maybe<Scalars['Int']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser?: Maybe<User>
  updateUser?: Maybe<User>
  removeUser?: Maybe<Scalars['Boolean']>
}

export type MutationCreateUserArgs = {
  id: Scalars['ID']
  name: Scalars['String']
  posts: Scalars['JSON']
}

export type MutationUpdateUserArgs = {
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  posts?: Maybe<Scalars['JSON']>
}

export type MutationRemoveUserArgs = {
  id: Scalars['ID']
}

export type Query = {
  __typename?: 'Query'
  User?: Maybe<User>
  allUsers?: Maybe<Array<Maybe<User>>>
  _allUsersMeta?: Maybe<ListMetadata>
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export type QueryAllUsersArgs = {
  page?: Maybe<Scalars['Int']>
  perPage?: Maybe<Scalars['Int']>
  sortField?: Maybe<Scalars['String']>
  sortOrder?: Maybe<Scalars['String']>
  filter?: Maybe<UserFilter>
}

export type Query_AllUsersMetaArgs = {
  page?: Maybe<Scalars['Int']>
  perPage?: Maybe<Scalars['Int']>
  filter?: Maybe<UserFilter>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  name: Scalars['String']
  posts: Scalars['JSON']
}

export type UserFilter = {
  q?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  posts?: Maybe<Scalars['JSON']>
}
export type UserFieldsFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'posts'
>

export type UserQueryVariables = {
  id: Scalars['ID']
}

export type UserQuery = { __typename?: 'Query' } & {
  User: Maybe<{ __typename?: 'User' } & UserFieldsFragment>
}
export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    name
    posts
  }
`
export const UserDocument = gql`
  query User($id: ID!) {
    User(id: $id) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`

export function useUserQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<UserQueryVariables>
) {
  return ReactApolloHooks.useQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  )
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>
