<template>
    <div id="app">

        <SubmitQuoteModal></SubmitQuoteModal>
        <DeleteQuoteModal></DeleteQuoteModal>
        <DeleteBookModal></DeleteBookModal>

        <div class="container container-behind-nav">
            <div class="page-header">
                <h1 v-if="activeTab != 1 && book.title == null">Загрузка...</h1>
                <span v-else>
                    <h1>{{ activeTab == 1 ? 'Мои цитаты' : book.title}}</h1>
                    <span v-if="activeTab != 1">
                        <p class="lead">{{ book.author ? book.author : 'Загрузка...' }}</p>
                        <div class="btn-toolbar">
                        <button @click="addQuote" class="btn btn-info"><span class="icon-plus" aria-hidden="true">&nbsp;</span>Добавить
                цитату
                </button>
                <div class="btn-group">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="icon-cog" aria-hidden="true"></span>
                                    </button>
                    <ul class="dropdown-menu pull-right">
                        <li>
                            <a @click="setTwitterBook">
                                <span v-if="isTwitterBook" class="icon-checkmark" aria-hidden="true">&nbsp;</span>Экспорт
                                из Twitter</a>
                        </li>
                        <li role="separator" class="divider"></li>
                        <li><a @click="deleteBook">Удалить книгу</a></li>
                    </ul>
                </div>
            </div>
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
            <QuoteItem v-for="quote in quotes" :key="quote.id" :quote="quote" :canEdit="activeTab!= 1" :needsBookLink="book.id == null"></QuoteItem>
        </div>
    </div>
    </div>
</template>
<script>
    import QuoteItem from '@/components/QuoteItem'

    import SubmitQuoteModal from '@/components/SubmitQuoteModal'
    import DeleteBookModal from '@/components/DeleteBookModal'
    import DeleteQuoteModal from '@/components/DeleteQuoteModal'

    import Books from '@/api/books'
    import Quotes from '@/api/quotes'

    export default {
        name: 'app',
        components: { QuoteItem, SubmitQuoteModal, DeleteBookModal, DeleteQuoteModal },
        props: ['bookId', 'bookTitle', 'bookAuthor'],
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

            this.$root.bus.$on('quote-updated', this.onQuoteUpdated)
            this.$root.bus.$on('quote-added', this.onQuoteAdded)
            this.$root.bus.$on('quote-deleted', this.onQuoteDeleted)

            this.$root.bus.$on('book-deleted', this.onBookDeleted)
        },
        watch: {
            '$route'(to, from) {
                this.afterRouteChanged()
            }
        },
        methods: {
            afterRouteChanged() {
                this.book = {
                    id: this.bookId,
                    title: this.bookTitle,
                    author: this.bookAuthor
                }

                this.$root.$data.activeTab = this.book.id != null ? -1 : 1

                if (this.bookId != null) {
                    this.loadBookData()
                }

                this.loadQuotes()
            },
            loadBookData() {
                Books(this.$root).get(this.book.id)
                    .then(book => {
                        this.book = book
                    })
                    .catch(error => console.log(error))
            },
            loadQuotes() {
                this.quotesLoaded = false
                this.quotes = []
                Quotes(this.$root).get(this.book.id)
                    .then(response => {
                        this.quotes = response.items
                        this.quotesLoaded = true
                    })
                    .catch(error => {
                        this.quotesFailed = true
                    })
            },
            deleteBook() {
                this.$root.bus.$emit('delete-book', this.book.id, this.book.title)
            },
            onBookDeleted() {
                this.$router.push({
                    name: 'Books'
                })
                this.$root.bus.$emit("toast", {
                    text: "Книга удалена"
                })
            },
            addQuote() {
                this.$root.bus.$emit('add-quote', this.book.id)
            },
            onQuoteAdded(quote) {
                this.quotes.splice(0, 0, quote)
            },
            onQuoteUpdated(quote) {
                let exQuote = this.quotes
                    .find(it => it.id == quote.id)
                let index = this.quotes.indexOf(exQuote)
                exQuote.text = quote.text
                exQuote.is_public = quote.is_public
                this.$set(this.quotes, index, exQuote)
            },
            onQuoteDeleted(id) {
                let quote = this.quotes
                    .find(it => it.id == id)
                let index = this.quotes.indexOf(quote)
                this.quotes.splice(index, 1)
            },
            setTwitterBook() {
                Books(this.$root).setTwitterBook(this.book.id)
                    .then(result => {
                        this.$root.$data.user.twitter.book = this.book.id
                        this.$root.bus.$emit('toast', {
                            duration: 5000,
                            text: 'Теперь цитаты, отправленные с Kindle через Twitter, будут добавляться к этой книге'
                        })
                    })
                    .catch(error => {
                        this.$root.bus.$emit('toast-error')
                    })
            }
        },
        computed: {
            isTwitterBook() {
                return this.$root.$data.user.twitter
                    && this.$root.$data.user.twitter.book == this.book.id
            },
            activeTab() {
                return this.$root.$data.activeTab
            }
        },
        beforeDestroy() {
            this.$root.bus.$off('quote-updated', this.onQuoteUpdated)
            this.$root.bus.$off('quote-added', this.onQuoteAdded)
            this.$root.bus.$off('quote-deleted', this.onQuoteDeleted)

            this.$root.bus.$off('book-deleted', this.onBookDeleted)
        }
    }

</script>

<style>
    #quotesGrid {
        margin: 0 -10px 0 -10px;
    }
</style>