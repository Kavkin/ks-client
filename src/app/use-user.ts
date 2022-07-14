import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'

import api from '@/api/api-axios'
import { LoginResponse, Transfer } from '@/api/types'
import history from '@/app/history'
import ROUTES from '@/constants/routes'

export default function useUser() {
  useLocation()

  const { isLoading, data, isError } = useQuery(['refresh'], () =>
    api.post<Transfer<LoginResponse>>('/api/auth/refresh')
  )

  useEffect(() => {
    if (data?.data.dataBlock.role) {
      localStorage.setItem('userRole', data?.data.dataBlock.role || '')
    }
  }, [data?.data.dataBlock.role])

  useEffect(() => {
    if (!data && !isLoading) {
      history.push(ROUTES.LOGIN.PATH)
    }
  }, [data, isLoading, isError])

  if (location.pathname === '/') {
    history.push(ROUTES.INCIDENT_LIST.PATH)
  }

  return { isLoading, data, isError }
}
