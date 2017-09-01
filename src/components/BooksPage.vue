<template>
    <div id="app">

        <AddBookModal></AddBookModal>

        <div class="container container-behind-nav">
            <div class="page-header">
                <h1>Мои книги</h1>
                <button class="btn btn-info" @click="addBook"><span class="icon-plus" aria-hidden="true">&nbsp;</span>Добавить</button>
            </div>
            <p class="lead" v-if="this.$root.$data.booksLoaded && this.$root.$data.books.length == 0">
                Пока что здесь пусто
            </p>
            <p class="lead" v-if="!this.$root.$data.booksLoaded && !this.$root.$data.booksFailed">
                <span class="icon-spinner spin"></span>Загрузка...
            </p>
            <div v-if="this.$root.$data.booksLoaded && this.$root.$data.books.length >= 0" id="booksFilter" class="row">
                <div class="col-xs-12">
                    <div class="input-group">
                        <span class="input-group-addon" id="filter-addon"><span class="icon-search" aria-hidden="true"></span></span>
                        <input class="form-control col-md-4" v-model="filter" placeholder="Поиск" aria-describedby="filter-addon">
                    </div>
                </div>
            </div>
            <ErrorAlert v-if="this.$root.$data.booksFailed" message="Не удалось загрузить книги"></ErrorAlert>
            <div id="booksGrid">
                <BookItem v-for="book in filteredBooks" :book="book" :key="book.id"></BookItem>
            </div>
        </div>
    </div>
</template>
<script>
    import BookItem from '@/components/BookItem'
    import AddBookModal from '@/components/AddBookModal'

    export default {
        name: 'app',
        components: { BookItem, AddBookModal },
        data() {
            return {
                filter: ''
            }
        },
        created() {
            this.$root.$data.activeTab = 0
            this.$root.obtainBooks()

            this.$root.bus.$on('book-added', this.onBookAdded)
        },
        updated() {
            $('[data-toggle="tooltip"]').tooltip()
        },
        methods: {
            addBook() {
                this.$root.bus.$emit('add-book')
            },
            onBookAdded() {
                this.$root.bus.$emit('toast', {
                    mode: 'success',
                    text: 'Книга добавлена'
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
            twitterBook() {
                let bookId = null
                try {
                    bookId = this.$root.$data.user.twitter.book
                } catch (e) { }
                return bookId != null ? bookId : 0
            },
            filteredBooks() {
                let filter = this.filter.toLowerCase().trim()
                let filterParts = this.filter.split(' ')
                if (this.filter == '') {
                    return this.$root.books
                } else {
                    return this.$root.books.filter(it => {
                        return this.isBookMatchFilter(it, filter)
                    })
                }
            }
        },
        beforeDestroy() {
            this.$root.bus.$off('book-added', this.onBookAdded)
        }
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