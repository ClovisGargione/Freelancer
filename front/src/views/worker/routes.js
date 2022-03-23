import Worker from './Worker'
import WorkerUser from './WorkerUser'

export default [
  {
    path: '/worker',
    name: 'worker',
    component: WorkerUser
  },
  {
    path: '/worker/:id',
    name: 'worker-show',
    component: Worker
  }
]
