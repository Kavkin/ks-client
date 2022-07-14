import './nav-panel.css'

import React, { useRef } from 'react'

import history from '@/app/history'
import ROUTES from '@/constants/routes'
import Nav, { NavItem } from '@/shared/nav'
import { useResize } from '@/utils/use-resize/use-resize'

const items: NavItem[] = [ROUTES.MAIN].map((route) => {
  return {
    label: route.NAME,
    key: route.PATH,
    iconName: route.PAYLOAD?.iconName,
  }
})

export default function NavPanel(): JSX.Element | null {
  const ref = useRef(null)

  const currentRoute = Object.values(ROUTES).find((route) => route.isPartOf(location.pathname))

  const { ResizeLine } = useResize({
    name: 'navPanel',
    direction: 'left',
    callapsible: true,
    size: {
      max: 777,
      min: 230,
      collapsed: 54,
      default: 230,
    },
    ref,
    ms: 333,
  })

  function onLinkClick(item: NavItem) {
    if (item) {
      history.push(item?.key)
    }
  }

  return (
    <div className="NavPanel" ref={ref}>
      {ResizeLine}
      <Nav items={items} onChange={onLinkClick} selectedKey={currentRoute?.PATH} />
    </div>
  )
}
