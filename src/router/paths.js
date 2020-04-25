/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

export default [
  {
    path: '/games',
    view: 'Games',
    name: 'Доступные мероприятия',
  },
  {
    path: '/game/:id',
    view: 'Game',
    name: 'Мониторинг игры',
  },
  {
    path: '/login',
    view: 'Login',
    name: 'login',
  },
]
