<template>
    <div class="header">
		<div class="container">
			<div class="row">
                <nav class="menu">
	                <ul class="active">
		                <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
		                <li><a href="#">Airplane Ticket</a></li>
		                <li>
							<router-link :to="{ name: 'Bus' }">Bus Ticket</router-link>
						</li>
		                <li><a href="#">Packages</a></li>
		                <li><a href="#">About</a></li>
						
		                <li v-if="!profileUser">
							<router-link :to="{ name: 'Login' }">Login</router-link>
						</li>
                    	<li v-if="!profileUser">
							<router-link :to="{ name: 'Register' }">Register</router-link>
						</li>
						<li v-if="profileUser">
							<router-link v-if="profileUser.role_id == 1" :to="{ name: 'AdminHome' }">{{ profileUser.username }}</router-link>
							<router-link v-if="profileUser.role_id == 2" :to="{ name: 'Home' }">{{ profileUser.username }}</router-link>
						</li>
						<li v-if="profileUser">
							<button @click="Logout">Logout</button>
						</li>
	                </ul>
                </nav>
			</div>
		</div>
		<div class="traveltext">
			<p class="t-first">Enjoy Your Trip Enjoy Your Travel Enjoy Your life</p>
		</div>
	</div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
		...mapGetters([
			'profileUser'
		])
	},
	mounted() {
		console.log(this.profileUser);
		
	},
	methods: {
		Logout() {
			this.$store.dispatch('logout')
				.then(() => {
					console.log(this.$store.getters.profileUser);
					
				})
		}
	},
	
}
</script>