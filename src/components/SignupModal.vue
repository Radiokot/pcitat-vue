<template>
	<div class="modal fade" :id="modalId" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Создать аккаунт</h4>
                    </div>
                    <form @submit.prevent="onSignupSubmit">
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="signupName">Ваше имя</label>
                                <input v-model="signupData.name" class="form-control" name="signupName" id="signupName" placeholder="Введите ваше имя" required autofocus>
                            </div>
                            <div class="form-group">
                                <label for="signupEmail">Email</label>
                                <input v-model="signupData.email" class="form-control" type="email" name="signupEmail" id="signupEmail" placeholder="Введите ваш email"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="signupPassword">Пароль</label>
                                <input v-model="signupData.password" class="form-control" type="password" name="signupPassword" autocomplete="off" id="signupPassword"
                                    placeholder="Введите ваш пароль" required>
                            </div>
                            <p class="small">Регистрируясь, вы соглашаетесь
                                с <a :href="termsUrl" target="_blank">Договором об использовании</a> и 
                                <a :href="privacyUrl" target="_blank">Договором конфиденциальности</a>
                            </p>
                            <ErrorAlert :message="errorMessage"></ErrorAlert>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
                            <input type="submit" :class="['btn', 'btn-info', !signupButtonEnabled ? 'disabled' : '']" value="Зарегистрироваться">
                        </div>
                    </form>
                </div>
            </div>
        </div>
</template>
<script>
	import Users from '@/api/users'

	export default {
		data() {
			return {
				signupButtonEnabled: true,
				errorMessage: '',
                modalId: 'signupModal',
                signupData: {
                    email: '',
                    name: '',
                    password: ''
                }
			}
		},
		mounted() {
			$(this.queryModalId).on('shown.bs.modal', function () {
				$(this).find('[autofocus]').focus()
			})

            this.$root.bus.$on('signup', this.onSignup)
		},
		computed: {
			queryModalId() {
				return '#' + this.modalId
			},
            termsUrl() {
                return this.$router.resolve({name: "Terms"}).href
            },
            privacyUrl() {
                return this.$router.resolve({name: "Privacy"}).href
            }
		},
		methods: {
            onSignup() {
                this.errorMessage = ''
                this.signupButtonEnabled = true
                $(this.queryModalId).modal('show')
            },
			onSignupSubmit() {
				if (!this.signupButtonEnabled) {
                    return
                }
                this.signupButtonEnabled = false
                this.errorMessage = ''
                this.signUp()
			},
			signUp() {
				Users(this.$root).signUp(this.signupData)
                    .then(user => {
                        this.$root.bus.$emit('new-user', user)
                        this.signupButtonEnabled = true
                        $(this.queryModalId).modal('hide')
                    })
                    .catch(error => {
                        if (error.code == 409) {
                            this.errorMessage = 'Этот email уже загеристрирован'
                        } else {
                            this.errorMessage = 'Не удалось создать аккаунт'
                        }
                        this.signupButtonEnabled = true
                    })
			}
		}
	}

</script>