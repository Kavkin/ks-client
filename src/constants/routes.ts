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
    name: 'User profile',
    path: '/user-profile',
    payload: {
      layout: ['main', 'nav', 'header'],
    },
  }),
}

export type Routes = typeof ROUTES

export default ROUTES
