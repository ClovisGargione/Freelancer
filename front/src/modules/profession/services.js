export default {
  getAll: { method: 'get', url: 'profession' },
  getCategories: { method: 'get', url: 'categories' },
  post: { method: 'post', url: 'profession' },
  delete: { method: 'delete', url: 'profession{/id}' },
  put: { method: 'put', url: 'profession' },
  get: { method: 'get', url: 'profession{/id}' },
  count: { method: 'get', url: 'profession/records/total' },
  search: { method: 'get', url: 'profession/search/text' }
}
