<template>
    <div id="app">
        <SignupModal></SignupModal>
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <h1 class="text-center"><img src="static/icon/icon.svg" width="120"><br>Просто цитатник</h1>
                    <br>
                </div>
                <div class="col-md-4 col-md-offset-4">
                    <form @submit.prevent="onLoginSubmit">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" name="email" id="email" placeholder="Email" v-model="loginData.email">
                        </div>
                        <div class="form-group">
                            <label for="password">Пароль</label>
                            <input type="password" class="form-control" name="password" id="password" placeholder="Пароль" v-model="loginData.password">
                        </div>
                        <ErrorAlert v-if="loginError" message="Не удалось войти в аккаунт"></ErrorAlert>
                        <button type="submit" id="loginButton" :class="['btn', 'btn-info', 'col-xs-12', !loginButtonEnabled ? 'disabled' : '']">Войти</button>
                    </form>
                    <br style="clear:both;">
                    <br>
                    <button class="btn btn-default col-xs-12" @click="signUp">Зарегистрироваться</button>
                    <br style="clear: both;">
                    <br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SignupModal from '@/components/SignupModal'

    import Users from '@/api/users'

    export default {
        name: 'app',
        components: { SignupModal },
        props: {
            logout: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                loginData: {
                    email: '',
                    password: ''
                },
                signupData: {
                    email: '',
                    name: '',
                    password: ''
                },
                signupButtonEnabled: true,
                loginButtonEnabled: true,
                loginError: false,
                signupErrorMessage: ''
            }
        },
        created() {
            this.$root.$data.activeTab = 3

            if (this.logout) {
                this.$root.$data.user = {
                    session: ''
                }
            }
        },
        methods: {
            signUp() {
                this.$root.bus.$emit('signup')
            },
            onLoginSubmit() {
                if (!this.loginButtonEnabled) {
                    return
                }
                this.loginButtonEnabled = false
                this.loginError = false
                this.logIn()
            },
            logIn() {
                Users(this.$root).logIn(this.loginData)
                    .then(user => {
                        this.$root.bus.$emit('new-user', user)
                        this.loginButtonEnabled = true
                    })
                    .catch(error => {
                        this.loginButtonEnabled = true
                        this.loginError = true
                    })
            }
        }
    }

</script>