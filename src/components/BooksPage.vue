<template>
    <div id="app">
        <Navigation :activeTab="this.$root.$data.activeTab"></Navigation>

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
            <ErrorAlert v-if="this.$root.$data.booksFailed" message="Не удалось загрузить книги"></ErrorAlert>
            <div id="booksGrid">
                <BookItem v-for="book in this.$root.$data.books" :book="book" :key="book.id"></BookItem>
            </div>
        </div>
        <Footer></Footer>
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
            }
        },
        computed: {
            twitterBook() {
                let bookId = null
                try {
                    bookId = this.$root.$data.user.twitter.book
                } catch (e) { }
                return bookId != null ? bookId : 0
            }
        },
        beforeDestroy() {
            this.$root.bus.$off('book-added', this.onBookAdded)
        }
    }

</script>