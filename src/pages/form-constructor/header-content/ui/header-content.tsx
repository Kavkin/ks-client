import { Stack } from '@fluentui/react'

import SchemaContextualMenu from './contextual-menu'
import SchemaForm from './schema-form'
import React from 'react'

import history from '@/app/history'
import ROUTES from '@/constants/routes'
import { Button } from '@/shared/button'
import { CompSchema, CreateCompSchema } from '@/shared/schema-drawer'

interface HeaderContentProps {
  compSchema: CreateCompSchema | CompSchema | null
  setCompSchema: (compSchema: CreateCompSchema | CompSchema) => void
  deleteCompSchema: () => void | Promise<void>
  copyCompSchema: () => void | Promise<void>
}

export default function Header(props: HeaderContentProps): null | JSX.Element {
  return (
    <header>
      <Stack horizontal verticalAlign="center" style={{ width: '100%', height: '100%' }}>
        <Stack horizontal horizontalAlign="start" style={{ margin: '0 64px 0 12px' }}>
          <Button
            variant="action"
            iconProps={{ iconName: 'ChevronLeft' }}
            onClick={() => history.push(ROUTES.SCHEMA_LIST.PATH)}
            text="t.buttons.back"
          />
        </Stack>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6, padding: '0 32px 0 0' }}>
          <SchemaForm setCompSchema={props.setCompSchema} compSchema={props.compSchema} />
          <SchemaContextualMenu deleteSchema={props.deleteCompSchema} copySchema={props.copyCompSchema} />
        </Stack>
      </Stack>
    </header>
  )
}
