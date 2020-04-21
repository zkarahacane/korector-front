import axios from 'axios';

const state = {
    authenticated: false,
    user:'',
};
const getters = {
    user: state => state.user,
    authenticated: state => state.authenticated
};
const mutations = {
    SET_USER(state, user){
        state.user = user;
    },
    SET_AUTH(state, auth){
        state.authenticated = auth;
    },
    CLEAR_USER(state){
        state.user = '';
    }
};
const actions = {
    async authenticate({ commit }) {
        try{
            const response = await fetch('/client/test');
            const body = response.text();

            if(body === ''){
                commit('SET_AUTH', false);
            } else{
				console.log('body: string :', body);
                commit('SET_AUTH', true);
                commit('SET_USER', body);
            }
			await axios.get('/client/test').then(response => {
				commit('SET_AUTH', true);
                commit('SET_USER',response.data);
			});
        }catch (error){
            console.log(error);
        }
    }
};
export default {
    namespaced: true, state, getters, mutations, actions,
};