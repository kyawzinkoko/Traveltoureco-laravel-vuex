<template>
    <div class="banner-auth">
        <div class="overlay">
            <div class="ui centered card">
                <form class="ui form">
					<div class="ui">
						<div class="field">
							<div class="ui left icon input">
								<i class="user icon"></i>
								<input type="email" v-model="user.email" name="email" placeholder="E-mail address">
							</div>
						</div>
						<div class="field">
							<div class="ui left icon input">
								<i class="lock icon"></i>
								<input type="password" v-model="user.password" name="password" placeholder="Password">
							</div>
						</div>
						<div v-if="isloading" class="ui fluid large loading yellow submit button">Login</div>
						<div v-else class="ui fluid large yellow submit button" @click="Login">Login</div>
					</div>
					<div class="ui error message" id="error">
						<ul class="list">
							<li v-for="(error, index) in errors" v-bind:key="index">
								{{ error }}
							</li>
						</ul>
					</div>
				</form>
            </div>
			<div class="ui card centered message grid">
                <div class="column centered">
                    New to Us ? <router-link :to="{ name: 'Register' }">Sign Up</router-link>
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
				email: '',
				password: '',
				type: 'login',
			},
			errors: [],
		}
	},
	computed: {
		isloading() {		
			return this.$store.getters.isloading
		}
	},
	methods: {
		Login(e) {
			if (this.user.email == '') {
				document.getElementById("error").style.display = 'block';
				this.errors.push('Email is Required!')
			}
			if (this.user.password == '') {
				document.getElementById("error").style.display = 'block';
				this.errors.push('Password is Required!')
			} 
			else {
				document.getElementById("error").style.display = 'none';
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