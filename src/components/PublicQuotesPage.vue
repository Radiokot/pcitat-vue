<template>
    <div id="app">

        <div class="container container-behind-nav">
            <div class="page-header">
                <h1 v-if="book.id != null && book.title == null">Загрузка...</h1>
                <span v-else>
                    <h3 v-if="userId != null && book.id != null">Публичные цитаты пользователя</h3>
                    <h1>{{ book.id == null ? 'Публичные цитаты пользователя' : book.title}}</h1>
                    <span v-if="book.id != null">
                        <p class="lead">{{ book.author ? book.author : 'Загрузка...' }}</p>
                    </span>
            </span>
        </div>
        <p class="text-center lead" v-if="quotesLoaded && quotes.length == 0">
            Пока что здесь пусто
        </p>
        <p class="text-center lead" v-if="!quotesLoaded && !quotesFailed">
            <span class="icon-spinner spin"></span>Загрузка...
        </p>
        <ErrorAlert v-if="quotesFailed" message="Не удалось загрузить цитаты"></ErrorAlert>
        <div id="quotesGrid">
            <QuoteItem v-for="quote in quotes" :key="quote.id" :quote="quote" :canEdit="false" :needsBookLink="book.id == null" :isPublic="true"></QuoteItem>
        </div>
    </div>
    </div>
</template>
<script>
    import QuoteItem from '@/components/QuoteItem'

    import Books from '@/api/books'
    import Quotes from '@/api/quotes'

    export default {
        name: 'app',
        components: { QuoteItem },
        props: ['userId', 'bookId', 'bookTitle', 'bookAuthor'],
        data() {
            return {
                book: {
                    id: null,
                    title: null
                },
                quotes: [],
                quotesLoaded: false,
                quotesFailed: false
            }
        },
        created() {
            this.afterRouteChanged()
        },
        watch: {
            '$route'(to, from) {
                this.afterRouteChanged()
            }
        },
        methods: {
            afterRouteChanged() {
                this.$root.$data.activeTab = -1

                this.book = {
                    id: this.bookId,
                    title: this.bookTitle,
                    author: this.bookAuthor
                }

                if (this.bookId != null) {
                    this.loadBookData()
                }

                this.loadQuotes()
            },
            loadBookData() {
                Books(this.$root).getPublic(this.userId, this.book.id)
                    .then(book => {
                        this.book = book
                    })
                    .catch(error => console.log(error))
            },
            loadQuotes() {
                this.quotesLoaded = false
                this.quotes = []
                Quotes(this.$root).getPublic(this.userId, this.book.id)
                    .then(response => {
                        this.quotes = response.items
                        this.quotesLoaded = true
                    })
                    .catch(error => {
                        this.quotesFailed = true
                    })
            },
        }
    }

</script>

<style>
    #quotesGrid {
        margin: 0 -10px 0 -10px;
    }
</style>