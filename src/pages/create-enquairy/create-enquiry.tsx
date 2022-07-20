import { Button } from '@fluentui/react'

import './create-enquiry.css'

import React from 'react'
import { Field, Form } from 'react-final-form'

import CustomTextField from '@/shared/textfield'

export default function EnquiryForm(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetch('/api/v1/enquiries', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <div className="Main EnquiryForm">
      <Form
        onSubmit={onSubmit}
        render={(formProps) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              <h1 style={{ fontSize: '20px', margin: '0px 0px 16px' }}>Cоздать заявку</h1>
              <div>
                <Field<string> name="name" required>
                  {({ input }) => <CustomTextField label="Имя" {...input} />}
                </Field>
                <Field<string> name="phone" required>
                  {({ input }) => <CustomTextField label="Номер" {...input} />}
                </Field>
                <Field<string> name="comment" required>
                  {({ input }) => <CustomTextField label="Комментарий" {...input} />}
                </Field>
              </div>
              <Button type="submit" style={{ margin: '24px 0 0' }} text="Отправить" />
            </form>
          )
        }}
      ></Form>
    </div>
  )
}
