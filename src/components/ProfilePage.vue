<template>
    <div id="app">

        <div class="container container-behind-nav">
            <div class="page-header">
                <h1>Параметры профиля</h1>
            </div>
            <p class="lead" v-if="!this.$root.$data.userLoaded">
                <span class="icon-spinner spin"></span>Загрузка...
            </p>
            <span v-else>
                <h3>Информация</h3>
                <div class="row">
                    <div class="col-sm-6">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-5 control-label">Имя:</label>
                                <div class="col-sm-7">
                                    <p class="form-control-static">
                                        {{ this.$root.user.name }}
                                    </p>
                                </div>
                                <label class="col-sm-5 control-label">Email:</label>
                                <div class="col-sm-7">
                                    <p class="form-control-static">
                                        {{ this.$root.user.email }}
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <h3>Экспорт через Twitter <router-link :to="{name: 'KindleExportFaq'}"><span class="badge">?</span></router-link></h3>
                <div class="row">
                    <div class="col-sm-6">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-5 control-label">Учетная запись:</label>
                                <div class="col-sm-7">
                                    <p class="form-control-static">
                                        <span v-if="twitterAccount">
                                        {{ twitterAccount }}
                                        &nbsp;&nbsp;
                                        </span><a :href="twitterAuthUrl" role="button">
                                        {{ twitterAccount ? 'Изменить' : 'Указать'}}
                                    </a> 
                                    </p>             
                                </div>
                                <label class="col-sm-5 control-label">Бот:</label>
                                <div class="col-sm-7">
                                    <p class="form-control-static">
                                       <a href="https://twitter.com/pcitat" target="_blank">@pcitat</a>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </span>
        </div>
    </div>
</template>
<script>
    import sha256 from 'sha256'
    export default {
        name: 'app',
        components: {  },
        data() {
            return {
            }
        },
        created() {
            this.$root.$data.activeTab = 2
        },
        computed: {
            twitterAccount() {
                return this.$root.$data.user.twitter ? this.$root.$data.user.twitter.username : null
            },
            twitterAuthUrl() {
                let credentials = this.$root.$data.credentials
                let redirectBase = process.env.API_URL + "twitterOauth.php"
                let email = credentials.email
                let requestKey = sha256(credentials.key)
                return `${redirectBase}?email=${email}&request_key=${requestKey}`
            }
        }
    }

</script>