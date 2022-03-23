import services from '@/http'

export const ActionCreateRating = ({ commit }, payload) => {
  return services.rating.create(payload)
}
