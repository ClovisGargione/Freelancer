export default {
  create: { method: 'post', url: 'personal' },
  remove: { method: 'delete', url: 'personal' },
  show: { method: 'get', url: 'personal{/id}' }

}
