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
        controller.authenticate(this.username, this.password).then(res => {
          if (res.authenticated) {
            console.log('User authenticated!');
          }
        })
      },
      createUser () {
        controller.createUser(this.newUsername, this.newPassword).then(res => {
          if (!res) {
            console.log('There was a problem singing up');
          }
        });
      }
    }
  }
</script>

<style>

</style>