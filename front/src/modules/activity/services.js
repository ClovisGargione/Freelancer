export default {
  getAll: { method: 'get', url: 'activity' },
  create: { method: 'post', url: 'activity' },
  remove: { method: 'delete', url: 'activity{/activityId}' },
  update: { method: 'put', url: 'activity' },
  find: { method: 'get', url: 'activity{/activityId}' },
  findByUser: { method: 'get', url: 'activity/user/find' },
  findByPersonalUser: { method: 'get', url: 'activity/personal/user' },
  findPendingByPersonal: { method: 'get', url: 'activity/pending/find' }
}
