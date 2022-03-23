import store from '../store'

export default async (to, from, next) => {
  if (to.name !== 'login' && !store.getters['auth/hasToken']) {
    try {
      await store.dispatch('auth/ActionCheckToken')
      await store.dispatch('activity/ActionGetActivitiesNotRated')
      await store.dispatch('activity/ActionGetActivitiesStarted')
      await store.dispatch('activity/ActionGetActivitiesConfirmed')
      next({ path: to.path })
    } catch (err) {
      next({ name: 'login' })
    }
  } else {
    if (to.name === 'login' && store.getters['auth/hasToken']) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
}
