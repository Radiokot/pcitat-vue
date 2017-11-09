import Vue from 'vue'
import Router from 'vue-router'

import LoginPage from '@/components/LoginPage'
import BooksPage from '@/components/BooksPage'
import QuotesPage from '@/components/QuotesPage'
import ProfilePage from '@/components/ProfilePage'
import KindleExportFaqPage from '@/components/KindleExportFaqPage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: LoginPage,
            props: true
        }, {
            path: '/logout',
            redirect: { name: 'Login', params: { logout: true } }
        }, {
            path: '/books',
            name: 'Books',
            component: BooksPage
        }, {
            path: '/books/:bookId',
            name: 'BookQuotes',
            component: QuotesPage,
            props: true
        }, {
            path: '/quotes',
            name: 'Quotes',
            component: QuotesPage
        }, {
            path: '/profile',
            name: 'Profile',
            component: ProfilePage
        }, {
            path: '/kindle-export-faq',
            name: 'KindleExportFaq',
            component: KindleExportFaqPage
        } , {
            path: '/',
            redirect: { name: 'Books' }
        }
    ]
})
