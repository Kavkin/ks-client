import { getCurrent, setPreviousRoute } from '@savchenko91/rc-route-constant'

import './reset.css'

import './animation.css'
import './common.css'
import './index.css'
import './layout.css'
import './toast.css'
import './utils.css'
import '@/shared/theme/ui/theme.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

import DocumentTitle from './document-title'
import RootRoutes from './root-routes'
import clsx from 'clsx'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import ROUTES from '@/constants/routes'
import NavPanel from '@/shared/nav-panel'
import Header from '@/widgets/header'

export default function Layer(): null | JSX.Element {
  useLocation()

  setPreviousRoute(ROUTES)

  const layout = getCurrent(ROUTES)?.PAYLOAD.layout.sort() || []

  return (
    <PerfectScrollbar className={clsx('Layout', layout.join('-'))} style={{ zIndex: 300 }}>
      <DocumentTitle />
      {layout.includes('header') && <Header />}
      {layout.includes('nav') && <NavPanel />}
      <RootRoutes />
      <ToastContainer />
    </PerfectScrollbar>
  )
}
