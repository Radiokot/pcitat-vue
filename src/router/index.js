import Vue from 'vue'
import Router from 'vue-router'

import LoginPage from '@/components/LoginPage'
import BooksPage from '@/components/BooksPage'
import PublicBooksPage from '@/components/PublicBooksPage'
import QuotesPage from '@/components/QuotesPage'
import PublicQuotesPage from '@/components/PublicQuotesPage'
import ProfilePage from '@/components/ProfilePage'
import KindleExportFaqPage from '@/components/KindleExportFaqPage'
import PrivacyPage from '@/components/PrivacyPage'
import TermsPage from '@/components/TermsPage'

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
            path: '/public/:userId/books',
            name: 'PublicBooks',
            component: PublicBooksPage,
            props: true
        }, {
            path: '/books/:bookId',
            name: 'BookQuotes',
            component: QuotesPage,
            props: true
        }, {
            path: '/public/:userId/books/:bookId',
            name: 'PublicBookQuotes',
            component: PublicQuotesPage,
            props: true
        }, {
            path: '/quotes',
            name: 'Quotes',
            component: QuotesPage
        }, {
            path: '/public/:userId/quotes',
            name: 'PublicQuotes',
            component: PublicQuotesPage,
            props: true
        }, {
            path: '/profile',
            name: 'Profile',
            component: ProfilePage
        }, {
            path: '/kindle-export-faq',
            name: 'KindleExportFaq',
            component: KindleExportFaqPage
        }, {
            path: '/privacy',
            name: 'Privacy',
            component: PrivacyPage
        }, {
            path: '/terms',
            name: 'Terms',
            component: TermsPage
        }, {
            path: '/',
            redirect: { name: 'Books' }
        }
    ]
})
