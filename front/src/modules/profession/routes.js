import Profession from './view/Profession'
import Create from './view/ProfessionCreate'
import Update from './view/ProfessionUpdate'

export default [
  {
    path: '/profession',
    name: 'profession',
    component: Profession
  },
  {
    path: '/profession/create',
    name: 'profession-create',
    component: Create
  },
  {
    path: '/profession/update/:id',
    name: 'profession-update',
    component: Update
  }
]
