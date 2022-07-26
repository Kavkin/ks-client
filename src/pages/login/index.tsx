import { Stack, Text } from '@fluentui/react'

import './index.css'

import axios from 'axios'
import React from 'react'
import { Field, Form } from 'react-final-form'

import history from '@/app/history'
import ROUTES from '@/constants/routes'
import { Button } from '@/shared/button'
import CustomTextField from '@/shared/textfield'
import { errorMessage } from '@/shared/toast'

export default function Login(): JSX.Element {
  async function onSubmit(data: Record<string, unknown>) {
    try {
      const response = await axios.post<any, any>('api/v1/auth/login', data)
      localStorage.setItem('accessToken', response.token)
      history.push(ROUTES.MAIN.PATH)
    } catch (e) {
      errorMessage('Неверный логин или пароль')
    }
  }

  return (
    <Stack className="Main Login">
      <Form
        onSubmit={onSubmit}
        render={(formProps) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              <Stack tokens={{ childrenGap: 8 }} style={{ width: '300px' }}>
                <Stack horizontalAlign="center">
                  <Text nowrap variant="mega">
                    OMS
                  </Text>
                </Stack>
                <Field<string> name="email" required>
                  {({ input }) => <CustomTextField label="email" {...input} />}
                </Field>
                <Field<string> name="password" required>
                  {({ input }) => <CustomTextField label="password" type="password" canRevealPassword {...input} />}
                </Field>
                <Button type="submit" style={{ margin: '24px 0 0' }} text="t.buttons.login" />
              </Stack>
            </form>
          )
        }}
      />
    </Stack>
  )
}
