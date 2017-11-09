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
                <h3>Экспорт через Twitter</h3>
                <div class="row">
                    <div class="col-sm-6">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-5 control-label">Учетная запись:</label>
                                <div class="col-sm-7">
                                    <p class="form-control-static">
                                        {{ twitterAccount ? twitterAccount : 'не указана'}}
                                    </p>
                                    <div id="uLogin" :data-ulogin="'display=panel;fields=first_name;theme=flat;providers=twitter;hidden=;mobilebuttons=0;redirect_uri=' + uLoginRedirectUrl + ';'"></div>
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
    export default {
        name: 'app',
        components: {  },
        data() {
            return {
            }
        },
        created() {
            this.$root.$data.activeTab = 2

            let uLoginScript = document.createElement('script')   
            uLoginScript.setAttribute('src', '//ulogin.ru/js/ulogin.js')
            document.head.appendChild(uLoginScript)
        },
        computed: {
            twitterAccount() {
                return this.$root.$data.user.twitter ? this.$root.$data.user.twitter.username : null
            },
            uLoginRedirectUrl() {
                return 'http://pc.radiokot.com.ua/api/twitter?' + this.$root.$data.user.session
            }
        }
    }

</script>