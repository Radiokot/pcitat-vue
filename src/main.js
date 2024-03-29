import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'
import Api from './api'
import toast from './toast'

Vue.config.productionTip = false
Vue.use(VueCookies)

Vue.component('Footer', require('@/components/Footer'))
Vue.component('Navigation', require('@/components/Navigation'))
Vue.component('ErrorAlert', require('@/components/ErrorAlert'))

import Books from '@/api/books'
import Users from '@/api/users'

let vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    data: {
        user: {},
        userLoaded: false,
        books: [],
        booksLoaded: false,
        booksFailed: false,
        activeTab: 0,
        Api: Api,
        bus: new Vue({}),
        credentials: undefined
    },
    created() {
        this.credentials = JSON.parse(this.$cookies.get('credentials'))

        if (this.user == undefined || this.user.id == undefined) {
            this.obtainUser()
        }

        this.bus.$on('toast', params => {
            toast(params)
        })
        this.bus.$on('toast-error', text => {
            toast({
                mode: 'error',
                text: text ? text : 'Ошибка'
            })
        })
        this.bus.$on('new-user', user => {
            this.clearData()
            this.user = user
            this.$router.push({ name: 'Books' })
        })
    },
    methods: {
        clearData() {
            this.user = {}
            this.userLoaded = false
            this.books = []
            this.booksLoaded = false
            this.booksFailed = false
        },
        obtainUser() {
            Users(this).getCurrent()
                .then(user => {
                    this.user = user
                })
                .catch(error => {
                    if (error.code != 401) {
                        console.log(error)
                    }
                })
        },
        obtainBooks() {
            Books(this).get()
                .then(response => {
                    this.books = response.items
                    this.booksLoaded = true
                })
                .catch(error => {
                    if (error.code != 401) {
                        console.log(error)
                        this.booksFailed = true
                    }
                })
        }
    },
    watch: {
        user: function (user) {
            if (!user) {
                return
            }

            this.user = user
            this.userLoaded = true
            this.credentials = {
                email: user.email,
                key: user.key
            }
            this.$cookies.set('credentials', JSON.stringify(this.credentials), -1)
        },
        booksLoaded: function (val) {
            this.booksLoaded = val
            if (val) {
                this.booksFailed = false
            }
        }
    }
})