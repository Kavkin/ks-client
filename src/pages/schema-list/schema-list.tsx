import { Stack } from '@fluentui/react'

import List from './list'
import React from 'react'

export default function SchemaListPage(): JSX.Element {
  return (
    <>
      <Stack as="main" className="Main SchemaList">
        <List />
      </Stack>
    </>
  )
}
