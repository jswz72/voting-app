<template>
  <div class="columns" style="margin: 0">
    <div class="column signin-page is-8 is-offset-2">
    <div class="signin">
      <p class="input-heading">Already signed up?</p>
      <p class="control has-icons-left"  :class="{'is-loading': loginUserLoading}">
        <input class="input" v-model="username" placeholder="Username">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
      </p>
      <div class="field">
        <p class="control has-icons-left" :class="{'is-loading': loginUserLoading}">
          <input class="input" v-model="password" placeholder="Password" type="password" @keyup.enter="authenticate">
          <span class="icon is-small is-left">
            <i class="fa fa-lock"></i>
          </span>
        </p>
        <p class="control">
          <button class="button is-info" @click="authenticate">Submit</button>
          <p v-if="userWarning" style="color: red;">Wrong Username or Password</p>
        </p>
      </div>

    </div>
    <div class="signup">
      <p class="input-heading">First time?</p>
      <p class="control has-icons-left" :class="{'is-loading': createUserLoading}">
        <input class="input" v-model="newUsername" placeholder="Username">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
      </p>
      <p class="control has-icons-left" :class="{'is-loading': createUserLoading}">
        <input class="input" v-model="newPassword" placeholder="Password" type="password" @keyup.enter="createUser">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
      </p>
      <p class="control has-icons-left" :class="{'is-loading': createUserLoading}">
	    <input class="input" :class="{'is-warning': confirmedPassword.length > 0 && !passwordsMatch, 'is-danger': sentWrongPasswords}" v-model="confirmedPassword" placeholder="Confirm Password" type="password" @keyup.enter="createUser">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
      </p>
      <p class="control">
        <button class="button is-info" @click="createUser">Submit</button>
      </p>
	  <p v-if="sentWrongPasswords" style="color: red;">Passwords do not match!</p>
    <p v-if="userNameTaken" style="color: red;">Username Already Taken!</p>
    </div>
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
        confirmedPassword: '',
        sentWrongPasswords: false,
        createUserLoading: false,
        loginUserLoading: false,
        userWarning: false,
        userNameTaken: false
      }
    },
    methods: {
      authenticate () {
        this.loginUserLoading = true;
        controller.authenticate(this.username, this.password).then(res => {
          this.loginUserLoading = false;
          this.username = this.password = '';
          if (res.username) {
            console.log('success');
            //Show successfully logged in
            this.userWarning = false;
            bus.$emit('authentication', true);
            this.$router.push('/')
          } else {
            console.log('fail');
            //Show wrong username or password
            this.userWarning = true;
          }
        })
      },
      createUser () {
        if (!this.passwordsMatch) {
          this.sentWrongPasswords = true;
          return;
        } else {
          this.sentWrongPasswords = false;
        }
        this.createUserLoading = true;
        controller.createUser(this.newUsername, this.newPassword).then(res => {
          const { user } = res;
          this.createUserLoading = false;
          this.newUsername = this.newPassword = this.confirmedPassword = '';
          if (!user) {
            console.log(`Username taken`);
            this.userNameTaken = true;
          } else {
            this.userNameTaken = false;
            console.log(`Successfully signed up ${user}`);
            bus.$emit('authentication', true);
            this.$router.push('/');
          }
        });
      }
    },
    computed: {
      passwordsMatch () {
        return this.newPassword === this.confirmedPassword;
      }
    }
  }
</script>

<style>
.signin-page {
  /*padding: 3%;*/
  text-align: center;
}
.input-heading {
  padding: 2%;
  font-size:1.5em;
}

.control {
  margin-top: 1%;
}

</style>
