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

<style>
    .book {
        margin: 0 10px 0px 10px;
        width: 180px;
        display: inline-block;
        vertical-align: top;
        text-align: left;
    }
    
    .book .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .book .cover {
        height: 250px;
        background-size: cover;
        background-position: center;
    }
    
    .book a {
        text-decoration: none;
    }
    
    .book .thumbnail {
        position: relative;
        padding: 9px;
    }
    
    .book .info {
        background: rgba(240, 240, 240, 0.9);
        width: 100%;
        height: 100%;
        line-height: 100%;
        padding: 10px;
        opacity: 0;
        color: #000000;
        transition: opacity .25s ease-out;
        text-align: center;
    }
    
    .vertical-align {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
    
    .book .info:hover {
        opacity: 1;
    }
    
    .book-badges {
        text-align: right;
        margin-right: -10px;
        margin-bottom: -10px;
    }
    
    .book-badges img {
        width: 1em;
        vertical-align: baseline;
    }
    
    .label-as-badge {
        border-radius: 1em;
        min-width: 2em;
    }
    
    @media (max-width: 425px) {
        .book {
            width: 42%;
        }
    }
    
    @media (max-width: 400px) {
        .book {
            width: 42%;
        }
        .book .cover {
            height: 200px;
        }
    }
    
    @media (max-width: 340px) {
        .book {
            width: 180px;
        }
        .book .cover {
            height: 250px;
        }
    }
</style>