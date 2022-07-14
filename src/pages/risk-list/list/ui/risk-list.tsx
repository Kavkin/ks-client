import { Stack } from '@fluentui/react'

import React from 'react'

import componentList from '@/constants/component-list'
import SchemaDrawer, { CompSchema, Dictionary } from '@/shared/schema-drawer'

interface RiskListProps {
  schema: CompSchema
  schemas: Dictionary<CompSchema>
}

function RiskList(props: RiskListProps): JSX.Element {
  return (
    <Stack className="RiskList" tokens={{ padding: '0 0 50vh 0' }}>
      <SchemaDrawer
        componentList={componentList}
        schema={props.schema}
        schemas={props.schemas}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context={{ form: {} } as any}
      />
    </Stack>
  )
}

export default RiskList
