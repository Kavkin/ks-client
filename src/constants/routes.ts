import Route from '@savchenko91/rc-route-constant'

const ROUTES = {
  FORM_CONSTRUCTOR: new Route({
    name: 'Конструктор',
    path: '/form-constructor/:id',
    payload: {
      layout: ['main'],
    },
  }),

  FORM_CONSTRUCTOR_EDIT: new Route({
    name: 'Конструктор',
    path: '/form-constructor/:id',
    payload: {
      layout: ['main'],
    },
  }),

  // return id ? `${this.PATH}/${id}` : this.PATH

  LOGIN: new Route({
    name: 'Авторизация',
    path: '/login',
    payload: {
      layout: ['main'],
    },
  }),

  SCHEMA_LIST: new Route({
    name: 'Конструктор',
    path: '/schemas',
    payload: { iconName: 'Favicon', layout: ['main', 'nav', 'header'] },
  }),

  INCIDENT_LIST: new Route({
    name: 'Рисковые события',
    path: '/incidents',
    payload: { iconName: 'DiffInline', layout: ['main', 'nav', 'header'] },
  }),

  CREATE_INCIDENT: new Route({
    name: 'Создание рискового события',
    path: '/incidents/create',
    payload: {
      layout: ['main', 'nav', 'header'],
    },
  }),

  INCIDENT: new Route({
    name: 'Рисковое событие',
    path: '/incidents/:id',
    payload: {
      layout: ['main', 'nav', 'header'],
    },
  }),

  RISK_LIST: new Route({
    name: 'Риски',
    path: '/risks',
    payload: { iconName: 'BullseyeTarget', layout: ['main', 'nav', 'header'] },
  }),

  USER_PROFILE: new Route({
    name: 'User profile',
    path: '/user-profile',
    payload: {
      layout: ['main', 'nav', 'header'],
    },
  }),
  // return id ? `${this.PATH}/${id}` : this.PATH
}

export type Routes = typeof ROUTES

export default ROUTES
