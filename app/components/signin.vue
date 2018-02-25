<template>
  <div class="signin-page">
    <div class="signin">
      <p class="input-heading">Already signed up?</p>
      <input v-model.trim="username" placeholder="Username">
      <input v-model="password" placeholder="Password" type="password" @keyup.enter="authenticate">
      <button class="button is-info" @click="authenticate">Submit</button>
    </div>
    <div class="signup">
      <p class="input-heading">First time?</p>
      <input v-model.trim="newUsername" placeholder="Username">
      <input v-model="newPassword" placeholder="Password" type="password" @keyup.enter="createUser">
	  <input v-model="confirmedPassword" placeholder="Confirm Password" type="password" @keyup.enter="createUser">
      <button class="button is-info" @click="createUser">Submit</button>
	  <p v-if="newPassword !== confirmedPassword">Passwords do not match!</p>
    </div>
  </div>
</template>

<script>
  import controller from '../controllers/controller.js'
  import bus from '../bus';

  export default {
    name: 'sign-in',
    data () {
      return {
        username: '',
        password: '',
        newUsername: '',
        newPassword: '',
        confirmedPassword: ''
      }
    },
    methods: {
      authenticate () {
        controller.authenticate(this.username, this.password).then(user => {
          this.username = this.password = '';
          if (user) {
            console.log(`Logged in ${user}`);
            bus.$emit('authentication', true);
          } else {
            console.log('Wrong username or password');
          }
        })
      },
      createUser () {
        if (this.confirmedPassword !== this.newPassword) {
          return;
		}
        controller.createUser(this.newUsername, this.newPassword).then(user => {
          this.newUsername = this.newPassword = '';
          if (!user) {
            console.log('There was a problem singing up');
          } else {
            console.log(`Successfully signed up ${user}`);
            bus.$emit('authentication', true);
          }
        });
      }
    }
  }
</script>

<style>
.signin-page {
  padding: 3%;
  text-align: center;
}
.input-heading {
  padding: 2%;
  font-size:1.5em;
}

</style>
