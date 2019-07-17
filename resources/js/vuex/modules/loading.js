const state = {
    isloading: false
}

const mutations = {
    isLoad: (state, bool) => {
        state.isloading = bool
    }
}

const getters = {
    isloading: state => state.isloading
}

export default {
    state,
    mutations,
    getters
}