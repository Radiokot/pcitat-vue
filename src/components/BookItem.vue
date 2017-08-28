<template>
    <div class="book">
        <div class="thumbnail">
            <router-link :to="{name: 'BookQuotes', params: {bookId: book.id, bookTitle: book.title, bookAuthor: book.author}}" append>
                <div class="cover" :style="'background-image: url(' + book.cover + ')'">
                    <div class="info">
                        <div class="vertical-align">
                            <h5>{{ book.title }}</h5>
                            <small>{{ book.author }}</small>
                        </div>
                    </div>
                </div>
                <div class="caption">
                    <h5 class="title">{{ book.title }}</h5>
                    <div class="book-badges">
                        <span v-if="twitterBook == book.id" class="label label-info label-as-badge" data-toggle="tooltip" data-placement="bottom"
                            title="Используется для экспорта из Twitter"><img src="static/icon/twitter-icon.svg"></span>
                        <span class="label label-primary label-as-badge" data-toggle="tooltip" data-placement="bottom" title="Количество цитат">{{ book.quotesCount }}</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['book'],
        computed: {
            twitterBook() {
                let bookId = null
                try {
                    bookId = this.$root.$data.user.twitter.book
                } catch (e) { }
                return bookId != null ? bookId : 0
            }
        }
    }

</script>