const state = {
    token: window.localStorage.getItem('token') ? window.localStorage.getItem('token') : '',
    user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : '',
    profileUser: null,
};

const actions = {
    auth: ({ dispatch, commit, state }, payload) => {
        
        if (payload.type == 'login') {
            
            let user = {
                'email': payload.email,
                'password': payload.password
            }
            return new Promise((resolve, reject) => {
                commit('isLoad', true)
                axios.post('/api/login', user)
                    .then(response => {
                        commit('isLoad', false)
                        commit('authenticate', response.data)
                        dispatch('getUser')      
                        resolve()                  
                    })
                    .catch(error => {
                        commit('isLoad', false)
                        console.log(error);
                        reject()                        
                    })
            })
        }
        if (payload.type == 'register') {
            let user = {
                'username': payload.username,
                'email': payload.email,
                'password': payload.password,
                'password_confirmation': payload.confirm_password
            }
            return new Promise((resolve, reject) => {
                commit('isLoad', true)
                axios.post('/api/register', user)
                    .then(response => {
                        commit('isLoad', false)
                        commit('authenticate', response.data)
                        dispatch('getUser') 
                        resolve()                        
                    })
                    .catch(error => {
                        commit('isLoad', false)
                        console.log(error);  
                        reject()                      
                    })
            })
        }
        
    },
    getUser: ({ dispatch, commit, state }) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/get-user')
                .then(response => {                    
                    commit('getUserInfo', response.data)
                })
                .catch(error => {
                    console.log(error);
                })
        })
    },
    logout: ({ dispatch, commit, state }) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/logout')
                .then(response => {
                    commit('logout')
                })
                .catch(error => {

                })
        })
    }
};

const mutations = {
    authenticate: (state, data) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
        state.token = data.token
        state.user = data.user
        window.localStorage.setItem('token', state.token)
        window.localStorage.setItem('user', JSON.stringify(state.user))  
    },
    getUserInfo: (state, data) => {
        state.profileUser = data
    },
    logout: (state) => {
        window.localStorage.clear()
        axios.defaults.headers.common['Authorization'] = ''
        state.token = ''
        state.user = ''
        state.profileUser = null
    }
};

const getters = {
    profileUser: state => state.profileUser
};

export default {
    state,
    actions,
    mutations,
    getters
}