/**
 * !GET INCIDENT / GET
 */
import api from '../api-axios'
import { Transfer } from '../types'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'

import { Risk } from '@/entities/risk/model/types'
import { Id } from '@/types/common'

export async function getRisk(id: Id): Promise<AxiosResponse<Transfer<Risk>>> {
  // TODO провалидировать и выкинуть критичную ошибку

  const response = await api.get<Transfer<Risk>>(`/api/risk/${id}`)

  if (response.status === 200) {
    // TODO провалидировать и выкинуть критичную ошибку
  }

  // TODO костыль!
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(response.data.dataBlock as any).action = 'save'

  return response
}

export function useGetRisk(id: Id | undefined) {
  const { t } = useTranslation()
  return useQuery([useGetRisk.name, id], queryFn)

  async function queryFn(): Promise<Transfer<Risk> | Error | undefined> {
    if (id === undefined) {
      return
    }

    try {
      const response = await getRisk(id)

      if (response.status !== 200) {
        return new Error(t('errors.responseNot200'))
      }

      return response.data
    } catch (e) {
      if (e instanceof Error) {
        return new Error(t(`errors.${e.name}`))
      }

      throw new Error('It is not possible but just in case!')
    }
  }
}
