import ROUTES from '../constants/routes'
import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import FormConstructor from '@/pages/form-constructor/form-constructor'
import IncidentListPage from '@/pages/incident-list/incident-list'
import IncidentFormPage from '@/pages/incident/incident-form'
import LoginPage from '@/pages/login'
import NotFoundPage from '@/pages/not-found/not-found'
import RiskListPage from '@/pages/risk-list/risk-list'
import SchemaListPage from '@/pages/schema-list/schema-list'
import UserProfilePage from '@/pages/user-profile/user-profile'

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
          <RouteAny path={ROUTES.FORM_CONSTRUCTOR.PATH}>
            <FormConstructor />
          </RouteAny>
          <RouteAny path={ROUTES.INCIDENT.PATH}>
            <IncidentFormPage />
          </RouteAny>
          <RouteAny path={ROUTES.CREATE_INCIDENT.PATH}>
            <IncidentFormPage />
          </RouteAny>
          <RouteAny path={ROUTES.INCIDENT_LIST.PATH}>
            <IncidentListPage />
          </RouteAny>
          <RouteAny path={ROUTES.RISK_LIST.PATH}>
            <RiskListPage />
          </RouteAny>
          <RouteAny path={ROUTES.SCHEMA_LIST.PATH}>
            <SchemaListPage />
          </RouteAny>
          <RouteAny path={ROUTES.LOGIN.PATH}>
            <LoginPage />
          </RouteAny>
          <RouteAny path={ROUTES.USER_PROFILE.PATH}>
            <UserProfilePage />
          </RouteAny>
          <RouteAny path="*">
            <NotFoundPage />
          </RouteAny>
        </SwitchAny>
      </CSSTransitionAny>
    </SwitchTransitionAny>
  )
}
