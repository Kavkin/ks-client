import Route from '@savchenko91/rc-route-constant'

const ROUTES = {
  LOGIN: new Route({
    name: 'Авторизация',
    path: '/login',
    payload: {
      layout: ['main'],
    },
  }),

  MAIN: new Route({
    name: 'Main',
    path: '/main',
    payload: {
      layout: ['main', 'nav', 'header'],
    },
  }),

  ENQUIRIES__CREATE: new Route({
    name: 'Создать заявку',
    path: '/enquiries/create',
    payload: {
      layout: ['main', 'nav', 'header'],
    },
  }),

  ENQUIRIES: new Route({
    name: 'Заявки',
    path: '/enquiries',
    payload: {
      layout: ['main', 'nav', 'header'],
    },
  }),
}

export type Routes = typeof ROUTES

export default ROUTES
