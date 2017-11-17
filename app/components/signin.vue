<template>
  <div>
    Already signed up?
    <input v-model="username" placeholder="Username">
    <input v-model="password" placeholder="Password" type="password">
    <button class="button is-info" @click="authenticate">Submit</button>
    First time?
    <input v-model="newUsername" placeholder="Username">
    <input v-model="newPassword" placeholder="Password" type="password">
    <button class="button is-info" @click="createUser">Submit</button>
  </div>
</template>

<script>
  import controller from '../controllers/clickController.client.js'
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
        controller.authenticate(this.username, this.password).then(user => {
          if (user) {
            console.log(`Logged in ${user}`);
          } else {
            console.log('Wrong username or password');
          }
        })
      },
      createUser () {
        controller.createUser(this.newUsername, this.newPassword).then(user => {
          if (!user) {
            console.log('There was a problem singing up');
          } else {
            console.log(`Successfully signed up ${user}`);
          }
        });
      }
    }
  }
</script>

<style>

</style>