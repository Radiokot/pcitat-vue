<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button v-if="this.$root.$data.userLoaded" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbarCollapse" aria-expanded="false">
            <span class="sr-only">Навигация</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
                <router-link class="navbar-brand" to="/">
                    <img alt="Просто Цитатник" src="static/icon/icon.svg" width="60">
                </router-link>
            </div>
            <div v-if="this.$root.$data.userLoaded" class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="nav navbar-nav">
                    <li :class="activeTab == '0' ? 'active' : ''">
                        <router-link to="/books">Мои книги</router-link>
                    </li>
                    <li :class="activeTab == '1' ? 'active' : ''">
                        <router-link to="/quotes">Мои цитаты</router-link>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li :class="activeTab == '2' ? 'active' : ''">
                        <router-link to="/profile"><span class="icon-user" aria-hidden="true"></span>&nbsp;{{this.$root.$data.user.name}}</router-link>
                    </li>
                    <li>
                        <router-link to="/logout"><span class="icon-exit" aria-hidden="true"></span>&nbsp;Выйти</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
    export default {
        props: ['activeTab'],
        watch: {
            '$route'(to, from) {
                $('.navbar-collapse').collapse('hide')
            }
        }
    }

</script>

<style>
    .navbar {
        border-radius: 0px;
        box-shadow: 0px -2px 10px black;
    }
    
    .navbar-nav>li>a {
        line-height: inherit !important;
    }
    
    .navbar-brand {
        padding-top: 2px;
    }
    
    .navbar-brand:hover {
        background: inherit !important;
    }
</style>