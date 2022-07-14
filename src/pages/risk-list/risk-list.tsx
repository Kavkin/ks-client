import { Stack } from '@fluentui/react'

import List from './list'
import React from 'react'

import { useGetDependencySchemas } from '@/api/comp-schema'

const RiskTableId = '3f351025-ae79-42a7-a17d-daffac1a623a'

export default function SchemaListPage(): JSX.Element {
  const { data: schemas } = useGetDependencySchemas([RiskTableId])

  const schema = schemas?.[RiskTableId]

  return (
    <>
      <Stack as="main" className="Main RiskList">
        {schema && schemas && <List schema={schema} schemas={schemas} />}
      </Stack>
    </>
  )
}
