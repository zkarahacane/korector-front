import axios from 'axios';
import UserService from "../../services/UserService";

const state = {
    authenticated: false,
    user: '',
    newUser: {
        id:'',
        username: '',
        email: '',
        nom: '',
        prenom: ''
    },
    users: [],
    usersImport:[],
    errors: [],
    importStep:1

};
const getters = {
    user: state => state.user,
    authenticated: state => state.authenticated,
    newUser: state => state.newUser,
    users: state => state.users,
    errors: state => state.errors,
    usersImport: state => state.usersImport,
    importStep: state => state.importStep,
};
const mutations = {
    SET_USERS(state, users) {
        state.users = users;
    },
    SET_USER(state, user) {
        state.user = user;
    },
    UPDATE_USER(state,user){
      const item = state.users.find(item => item.id === user.id);
      Object.assign(item,user);
    },
    SET_AUTH(state, auth) {
        state.authenticated = auth;
    },
    SET_USERS_IMPORT(state, usersImport){
      state.usersImport = usersImport;
      state.importStep = 2;
    },
    SAVE_USER_IMPORT(state, user){
        state.users.push(user);
        state.usersImport = state.usersImport.filter(obj => obj.username !== user.username);
        if(state.usersImport.length === 0) state.importStep = 3;
    },
    CLEAR_USERS_IMPORT(state, userImport){
      state.usersImport = userImport;
    },
    SET_ERRORS(state, errors) {
        state.errors = errors
    },
    ADD_ERROR(state, error) {
        state.errors.push(error)
    },
    ADD_USER(state, user) {
        state.users.push(user);
    },
    DELETE_USER(state, user){
        state.users = state.users.filter(obj => obj.id !== user.id);
    },
    CLEAR_FORM(state) {
        state.newUser = {
            id:'',
            username: '',
            email: '',
            nom: '',
            prenom: ''
        }
    },
    CLEAR_STATE(state) {
        state.user = '';
    },
    CLEAR_ERRORS(state) {
        state.errors = [];
    },
    CLEAR_IMPORT(state){
        state.usersImport = [];
        state.importStep = 1
    }
};
// TODO refaire fonction auhenticate au propre
const actions = {
    async authenticate({commit}) {
        try {
            const response = await fetch('/client/test');
            const body = response.text();

            if (body === '') {
                commit('SET_AUTH', false);
            } else {
                console.log('body: string :', body);
                commit('SET_AUTH', true);
                commit('SET_USER', body);
            }
            await axios.get('/client/test').then(response => {
                commit('SET_AUTH', true);
                commit('SET_USER', response.data);
            });
        } catch (error) {
            console.log(error);
        }
    },
    async save({commit}) {
        commit('CLEAR_ERRORS');
        if (!state.newUser) return;
        await UserService.saveApi(state.newUser)
            .then(response => {
                commit('ADD_USER', response.data);
                commit('CLEAR_FORM')
            })
            .catch(error => {
                console.error(error);
                commit('ADD_ERROR', error);
            })
    },
    async update({commit}){
      commit('CLEAR_ERRORS');
      if(!state.newUser) return;
      await UserService.updateApi(state.newUser)
          .then(response =>{
              commit('UPDATE_USER', response.data);
              commit('CLEAR_FORM')
          })
          .catch(error => {
              console.error(error);
              commit('ADD_ERRORS', error);
          })
    },
    async all({commit}){
        commit('CLEAR_ERRORS');
        await UserService.getUsersApi()
            .then(response => {
                console.log(JSON.stringify(response));
                commit('SET_USERS', response.data)
            })
            .catch(error => commit('ADD_ERROR', error));
    },
    async one({commit}, username){
        commit('CLEAR_ERRORS');
        await UserService.getUserApi(username)
            .then(response => commit('ADD_USER', response.data))
            .catch(error => commit('ADD_ERROR', error))
    },
    async delete({commit}, user){
        commit('CLEAR_ERRORS');
        await UserService.deleteApi(user.id)
            .then(() => commit('DELETE_USER', user))
            .catch(error => commit('ADD_ERROR', error));
    },
    async uploadUser({commit}, file){
        commit('CLEAR_ERRORS');
        await UserService.uploadCsvApi(file)
            .then(response => commit('SET_USERS_IMPORT', response.data))
            .catch(error => {
                console.error(error);
                commit('ADD_ERRORS', error);
            })
    },
    async importUser({commit}){
        commit('CLEAR_ERRORS');
        await state.usersImport.forEach(user => {
            let userForm = {
                username: user.username,
                email: user.email,
                nom: user.nom,
                prenom: user.prenom
            };
            UserService.saveApi(userForm).then(response => commit('SAVE_USER_IMPORT', response.data))
                .catch(error => {
                    console.error(error);
                    commit('ADD_ERROR', error);
                })
        });
    },
    clearImport({commit}){
        commit('CLEAR_IMPORT');
    },
    clearForm({commit}){
        commit('CLEAR_FORM');
    }
};
export default {
    namespaced: true, state, getters, mutations, actions,
};