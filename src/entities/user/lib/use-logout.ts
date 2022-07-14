import history from '@/app/history'
import ROUTES from '@/constants/routes'
import { errorMessage } from '@/shared/toast'

export default function useLogout() {
  async function logout() {
    const res = await fetch('/api/auth/logout')

    if (res.ok) {
      history.push(ROUTES.LOGIN.PATH)
    } else {
      errorMessage('Не удалось выйти')
    }
  }

  return logout
}
