import { Icon, Persona, PersonaSize } from '@fluentui/react'
import { Stack } from '@fluentui/react/lib/Stack'

import './header.css'

import React from 'react'
import { useLocation } from 'react-router-dom'

import LogoutButton from '@/entities/user/ui/logout-button'

export const HEADER_PORTAL_LEFT_CLASSNAME = '.headerPortalLeft'
export const HEADER_PORTAL_CENTER_CLASSNAME = '.headerPortalCenter'
export const HEADER_PORTAL_RIGHT_CLASSNAME = '.headerPortalRight'

export default function Header(): JSX.Element | null {
  // ререндерит хеадер при смене урла
  useLocation()

  return (
    <header>
      <Stack horizontal verticalAlign="center" className="Header" style={{ width: '100%', height: '100%' }}>
        <li>
          <LogoutButton />
        </li>
      </Stack>
    </header>
  )
}
