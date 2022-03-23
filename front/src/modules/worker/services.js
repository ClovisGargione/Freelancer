export default {
  create: { method: 'post', url: 'personal' },
  update: { method: 'put', url: 'personal{/personalId}' },
  remove: { method: 'delete', url: 'personal{/personalId}' },
  user: { method: 'get', url: 'personal/user/all' },
  getStates: { method: 'get', url: 'states' },
  getCities: { method: 'get', url: 'cities{/stateId}' },
  uploadImage: { method: 'post', url: 'personal-image{/personalId}' },
  find: { method: 'get', url: 'personal{/personalId}' },
  removeImage: { method: 'delete', url: 'personal-image{/personalId}{/imageId}' }
}
