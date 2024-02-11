<template>
    <div id="app">
        <div class="container container-behind-nav">
            <div class="page-header">
                <h1>Книги пользователя с цитатами</h1>
                <router-link :to="{name: 'PublicQuotes', params: { userId }}">К цитатам</router-link>
            </div>
            <p class="text-center lead" v-if="booksLoaded && books.length == 0">
                Пока что здесь пусто.
                <br><br>
                <small><router-link :to="{name: 'KindleExportFaq'}">Узнайте, как настроить экспорт отрывков с Kindle без подключения к компьютеру</router-link></small>
            </p>
            <p class="text-center lead" v-if="!booksLoaded && !booksFailed">
                <span class="icon-spinner spin"></span>Загрузка...
            </p>
            <div v-if="booksLoaded && books.length > 0" id="booksFilter" class="row">
                <div class="col-xs-12">
                    <div class="input-group">
                        <span class="input-group-addon" id="filter-addon"><span class="icon-search" aria-hidden="true"></span></span>
                        <input class="form-control col-md-4" v-model="filter" placeholder="Поиск" aria-describedby="filter-addon">
                    </div>
                </div>
            </div>
            <ErrorAlert v-if="booksFailed" message="Не удалось загрузить книги"></ErrorAlert>
            <div id="booksGrid">
                <BookItem v-for="book in filteredBooks" :book="book" :key="book.id" :isPublic="true" :userId="userId"></BookItem>
            </div>
        </div>
    </div>
</template>
<script>
    import BookItem from '@/components/BookItem'
    
    import Books from '@/api/books'
    
    export default {
        name: 'app',
        components: { BookItem },
        props: ['userId'],
        data() {
            return {
                filter: '',
                books: [],
                booksLoaded: false,
                booksFailed: false
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
        updated() {
            $('[data-toggle="tooltip"]').tooltip()
        },
        methods: {
            afterRouteChanged() {
                this.$root.$data.activeTab = -1

                this.loadBooks()
            },
            loadBooks() {
                this.booksLoaded = false
                this.books = []
                Books(this.$root).getPublic(this.userId)
                    .then(response => {
                        this.books = response.items
                        this.booksLoaded = true
                    })
                    .catch(error => {
                        this.booksFailed = true
                    })
            },
            isBookMatchFilter(book, filter) {
                let unmatchedBookParts = book.title.toLowerCase().split(' ')
                    .concat(book.author.toLowerCase().split(' '))
                let unmatchedFilterParts = filter.trim().toLowerCase().split(' ')
                let gotNewMatches = true
                while (unmatchedBookParts.length > 0
                    && unmatchedFilterParts.length > 0
                    && gotNewMatches) {
                    gotNewMatches = false
                    let i = unmatchedBookParts.length
                    while (--i >= 0) {
                        let bookPart = unmatchedBookParts[i]

                        let j = unmatchedFilterParts.length
                        while (--j >= 0) {
                            let filterPart = unmatchedFilterParts[j]
                            if (bookPart.startsWith(filterPart)) {
                                unmatchedBookParts.splice(i, 1)
                                unmatchedFilterParts.splice(j, 1)
                                gotNewMatches = true
                                break
                            }
                        }
                    }
                }
                return unmatchedFilterParts.length == 0
            }
        },
        computed: {
            filteredBooks() {
                let filter = this.filter.toLowerCase().trim()
                if (this.filter == '') {
                    return this.books
                } else {
                    return this.books.filter(it => {
                        return this.isBookMatchFilter(it, filter)
                    })
                }
            }
        },
    }

</script>

<style>
    #booksFilter {
        margin-bottom: 20px;
    }
    
    #booksGrid {
        margin: 0 -10px 0 -10px;
        text-align: justify;
    }
    
    @media (max-width: 992px) {
        #booksGrid {
            text-align: center;
        }
    }
</style>
