import WorkerUser from './view/WorkerUser'
import WorkerCreate from './view/WorkerCreate'
import WorkerImages from './view/WorkerImages'
import WorkerUpdate from './view/WorkerUpdate'

export default [
  {
    path: '/worker',
    name: 'worker',
    component: WorkerUser
  },
  {
    path: '/worker-create',
    name: 'worker-create',
    component: WorkerCreate
  },
  {
    path: '/worker-images/:id',
    name: 'worker-images',
    component: WorkerImages
  },
  {
    path: '/worker-update/:id',
    name: 'worker-update',
    component: WorkerUpdate
  }
]
