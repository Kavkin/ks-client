import ROUTES from '../constants/routes'
import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import EnquiryForm from '@/pages/create-enquairy/create-enquiry'
import EnquiriesForm from '@/pages/enquiries/enquiries'
import LoginPage from '@/pages/login'
import Main from '@/pages/main/main'
import NotFoundPage from '@/pages/not-found/not-found'

// https://github.com/remix-run/react-router/issues/8794
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RouteAny = Route as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SwitchAny = Switch as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SwitchTransitionAny = SwitchTransition as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CSSTransitionAny = CSSTransition as any

export default function RootRoutes() {
  const location = useLocation()

  return (
    <SwitchTransitionAny mode="out-in">
      <CSSTransitionAny key={location.pathname} timeout={100} classNames="appearVertically">
        <SwitchAny location={location}>
          <RouteAny path={ROUTES.ENQUIRIES.PATH}>
            <EnquiriesForm />
          </RouteAny>
          <RouteAny path={ROUTES.ENQUIRIES__CREATE.PATH}>
            <EnquiryForm />
          </RouteAny>
          <RouteAny path={ROUTES.LOGIN.PATH}>
            <LoginPage />
          </RouteAny>
          <RouteAny path={ROUTES.MAIN.PATH}>
            <Main />
          </RouteAny>
          <RouteAny path="*">
            <NotFoundPage />
          </RouteAny>
        </SwitchAny>
      </CSSTransitionAny>
    </SwitchTransitionAny>
  )
}
