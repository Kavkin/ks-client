import api from '../api-axios'
import { Transfer } from '../types'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query'

import { CreateInputRisk, Risk } from '@/entities/risk/model/types'

export async function createRisk(risk: CreateInputRisk): Promise<AxiosResponse<Transfer<Risk>>> {
  // TODO провалидировать и выкинуть критичную ошибку

  const response = await api.post('/api/risk', risk, { headers: { objAlias: 'Risk' } })

  if (response.status === 200) {
    // TODO провалидировать и выкинуть критичную ошибку
  }

  return response
}

export function useCreateRiskMutation(
  options?: UseMutationOptions<Transfer<Risk>, Error, CreateInputRisk>
): UseMutationResult<Transfer<Risk>, Error, CreateInputRisk> {
  const { t } = useTranslation()

  return useMutation<Transfer<Risk>, Error, CreateInputRisk>(queryFn, options)

  async function queryFn(risk: CreateInputRisk): Promise<Transfer<Risk>> {
    try {
      const response = await createRisk(risk)

      if (response.status !== 200) {
        throw new Error(t('errors.responseNot200'))
      }

      return response.data
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(t(`errors.${e.name}`))
      }

      throw new Error('It is not possible but just in case!')
    }
  }
}
