<template>
    <div class="banner-auth">
        <div class="overlay">
            <div class="ui centered card">
                <form class="ui form">
					<div class="ui">
						<div class="field">
							<div class="ui left icon input">
								<i class="user icon"></i>
								<input type="text" v-model="user.username" name="username" placeholder="User Name">
								<div v-if="errors.username" class="ui pointing below red basic label">
									{{ errors.username }}
								</div>
							</div>
						</div>
                        <div class="field">
							<div class="ui left icon input">
								<i class="envelope icon"></i>
								<input type="email" v-model="user.email" name="email" placeholder="E-mail address">
								<div v-if="errors.email" class="ui pointing below red basic label">
									{{ errors.email }}
								</div>
							</div>
						</div>
						<div class="field">
							<div class="ui left icon input">
								<i class="lock icon"></i>
								<input type="password" v-model="user.password" name="password" placeholder="Password">
								<div v-if="errors.password" class="ui pointing below red basic label">
									{{ errors.password }}
								</div>
							</div>
						</div>
                        <div class="field">
							<div class="ui left icon input">
								<i class="lock icon"></i>
								<input type="password" v-model="user.confirm_password" name="confirm_password" placeholder="Confirm Password">
								<div v-if="errors.confirm_password" class="ui pointing below red basic label">
									{{ errors.confirm_password }}
								</div>
							</div>
						</div>
						<div v-if="errors.equalPassword" class="ui error message">
							{{ errors.equalPassword }}
						</div>
						<div v-if="isloading" class="ui fluid large loading yellow submit button">Register</div>
						<div v-else class="ui fluid large yellow submit button" @click="Register">Register</div>
					</div>
					<div class="ui error message"></div>
				</form>
            </div>
            <div class="ui card centered message grid">
                <div class="column centered">
                    Already Registerd ? <router-link :to="{ name: 'Login' }">Sign In</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
     data() {
		return {
			user: {
				username: '',
				email: '',
				password: '',
				confirm_password: '',
				type: 'register',
			},
			errors: {
				username: null,
				email: null,
				password: null,
				confirm_password: null,
				equalPassword: null,
			}
		}
	},
	computed: {
		isloading() {		
			return this.$store.getters.isloading
		}
	},
	methods: {
		Register(e) {
			if (this.user.username == '') {
				this.errors.username = 'User Name is Required!'
			}
			if (this.user.email == '') {
				this.errors.email = 'Email is Required!'
			}
			if (this.user.password == '') {
				this.errors.password = 'Password is Required!'
			} 
			if (this.user.confirm_password == '') {
				this.errors.confirm_password = 'Confirm Password is Required!'
			} 
			if (this.user.password != this.user.confirm_password ) {
				this.errors.equalPassword = 'Password is Required!'
			}
			else {
				this.$store.dispatch('auth', this.user)
					.then(() => {
						this.$router.push('/')
					})
			}
			e.preventDefault();
		}
	},
}
</script>