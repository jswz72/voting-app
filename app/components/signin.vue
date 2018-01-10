<template>
  <div>
    Already signed up?
    <input v-model.trim="username" placeholder="Username">
    <input v-model="password" placeholder="Password" type="password" @keyup.enter="authenticate">
    <button class="button is-info" @click="authenticate">Submit</button>
    First time?
    <input v-model.trim="newUsername" placeholder="Username">
    <input v-model="newPassword" placeholder="Password" type="password" @keyup.enter="createUser">
    <button class="button is-info" @click="createUser">Submit</button>
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
        newPassword: ''
      }
    },
    methods: {
      authenticate () {
        controller.authenticate(this.username, this.password).then(res => {
          this.username = this.password = '';
          if (res.username) {
            console.log('success');
            //Show successfully logged in
            bus.$emit('authentication', true);
          } else {
            console.log('fail');
            //Show wrong username or password
          }
        })
      },
      createUser () {
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

</style>