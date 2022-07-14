import { Stack } from '@fluentui/react'

import List from './list'
import React from 'react'

import { useGetDependencySchemas } from '@/api/comp-schema'

const IncidentTableId = 'cb4c3d8d-bd2a-4dd5-8bd7-b76d10e99a71'

export default function SchemaListPage(): JSX.Element {
  const { data: schemas } = useGetDependencySchemas([IncidentTableId])

  const schema = schemas?.[IncidentTableId]

  return (
    <>
      <Stack as="main" className="Main IncidentList">
        {schema && schemas && <List schema={schema} schemas={schemas} />}
      </Stack>
    </>
  )
}
