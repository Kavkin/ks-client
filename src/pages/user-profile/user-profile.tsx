import { Stack } from '@fluentui/react'

import React, { FC } from 'react'

import LanguageDropdown from '@/shared/language-dropdown'
import ThemeDropdown from '@/shared/theme'

type UserProfileProps = {
  className?: string
}

const UserProfile: FC<UserProfileProps> = (): JSX.Element => {
  return (
    <>
      <Stack as="main" className="Main UserProfile">
        <Stack as="ul" tokens={{ childrenGap: 24, padding: '32px 0 0 0' }}>
          <li>
            <LanguageDropdown />
          </li>
          <li>
            <ThemeDropdown />
          </li>
        </Stack>
      </Stack>
    </>
  )
}

export default UserProfile
