import * as React from 'react'
import { css } from '@emotion/core'
import { useUserQuery } from '../graphql/generated/graphql'

export default () => {
  const { data } = useUserQuery({ variables: { id: '1' } })

  if (!data || !data.User) {
    return null
  }

  return (
    <div
      css={css`
        color: red;
        font-weight: bold;
      `}
    >
      User name is: {data.User.name}
    </div>
  )
}
