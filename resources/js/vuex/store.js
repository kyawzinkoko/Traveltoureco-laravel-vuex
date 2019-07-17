import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import auth from './modules/auth'
import load from './modules/loading'

const store = new Vuex.Store({
    modules: {
        load,
        auth,
    }
})

export default store