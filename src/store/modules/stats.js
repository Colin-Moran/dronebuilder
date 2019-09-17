import axiosInstance from '@/services/axios'

export default {
  namespaced: true,

  state: {
    meetups: {
      data: [],
      count: null,
    },
    threads: {
      data: [],
      count: null,
    },
    posts: {
      data: [],
      count: null,
    },
    faqs: {
      data: [],
      count: null,
      avatar: null,
      bio: null
    }
  },
  actions: {
    fetchUserStats ({commit}) {
      return axiosInstance.get('/api/v1/users/me/activity')
        .then(res => {
          const stats = res.data
          commit('setStats', stats)
          return stats
        })
    },
    fetchUsernameStats ({commit},username) {
      return axiosInstance.get(`/api/v1/faqs/${username}`)
        .then(res => {
          const stats = res.data
          commit('setStats', stats)
          return stats
        })
      }
  },
  mutations: {
    setStats (state, stats) {
      return Object.assign(state, {}, stats)
    }
  }
}
