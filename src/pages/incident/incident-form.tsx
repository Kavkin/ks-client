import { Stack } from '@fluentui/react'

import IncidentForm from './incident-form/incident-form'
import React from 'react'
import { useParams } from 'react-router-dom'

import { useGetDependencySchemas } from '@/api/comp-schema'
import { useGetIncident } from '@/api/incident/get'
import LoadingAria from '@/shared/loading-aria'

const IncidentSchemaId = 'd79d37b9-21a5-4017-a13d-27106cf749d8'

export default function Incident(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  const { data: fetchedSchemas, isLoading: isDependencySchemasLoading } = useGetDependencySchemas([IncidentSchemaId])
  const { data: fetchedIncident, isLoading: isIncidentLoading } = useGetIncident(id)

  const schema = fetchedSchemas?.[IncidentSchemaId]

  if (!isDependencySchemasLoading && !schema) {
    throw new Error('Something went wrong!')
  }

  function buildLabel() {
    const entityNames = []
    if (isDependencySchemasLoading) {
      entityNames.push('schema')
    }
    if (isIncidentLoading) {
      entityNames.push('incident')
    }
    return `Loading ${entityNames.join(', ')}`
  }

  const schemaErrorMessage = fetchedSchemas instanceof Error && fetchedSchemas.message
  const incidentErrorMessage = fetchedIncident instanceof Error && fetchedIncident.message
  const errorMessage = schemaErrorMessage || incidentErrorMessage

  return (
    <Stack as="main" className="Main Incident" tokens={{ padding: '0 0 50vh 0' }}>
      <LoadingAria loading={(isIncidentLoading || isDependencySchemasLoading) && !errorMessage} label={buildLabel()}>
        <>
          {errorMessage ? errorMessage : null}
          {(id ? !!fetchedIncident : true) && fetchedSchemas && schema && !errorMessage && (
            <IncidentForm
              key={id}
              schemas={fetchedSchemas}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              incident={(fetchedIncident as any)?.dataBlock}
              schema={schema}
            />
          )}
        </>
      </LoadingAria>
    </Stack>
  )
}
