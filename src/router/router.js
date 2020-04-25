import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home";
import Users from "../views/Users";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            alias: '/home',
            component: Home
        },
        {
            path: '/users',
            component: Users
        }
    ]
})