import api from '../api-axios'
import { Transfer } from '../types'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query'

import { Risk, UpdateInputRisk } from '@/entities/risk/model/types'

export async function updateRisk(risk: UpdateInputRisk): Promise<AxiosResponse<Transfer<UpdateInputRisk>>> {
  // TODO провалидировать и выкинуть критичную ошибку

  const response = await api.put(`/api/risk/${risk.instanceId}`, risk, {
    headers: { objAlias: 'Risk' },
  })

  if (response.status === 200) {
    // TODO провалидировать и выкинуть критичную ошибку
  }

  return response
}

export function useUpdateRiskMutation(
  options?: UseMutationOptions<Transfer<Risk>, Error, UpdateInputRisk>
): UseMutationResult<Transfer<Risk>, Error, UpdateInputRisk> {
  const { t } = useTranslation()

  return useMutation<Transfer<Risk>, Error, UpdateInputRisk>(queryFn, options)

  async function queryFn(risk: UpdateInputRisk): Promise<Transfer<Risk>> {
    try {
      const response = await updateRisk(risk)

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
