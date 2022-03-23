import { routes as home } from '../views/home'
import { routes as auth } from '../modules/auth'
import { routes as search } from '../modules/search'
import { routes as worker } from '../modules/worker'
import { routes as profession } from '../modules/profession'
import { routes as activity } from '../modules/activity'
import { routes as rating } from '../modules/rating'

export default [
  ...auth,
  ...home,
  ...search,
  ...worker,
  ...profession,
  ...activity,
  ...rating
]
