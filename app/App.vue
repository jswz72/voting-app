<template>
  <div class="container is-fluid">
    <header>
      <nav id="navbar" class="is-horizontal">
        <router-link to="/" class="button is-primary">
          FCC Voting App
        </router-link>
        <div id="dropdown">
          <button class="button is-success" id="dropbtn" @click="dropDownClicked = !dropDownClicked">
            <i class="fa fa-bars"></i>
          </button>
          <drop-down v-if="dropDownClicked"></drop-down>
        </div>
      </nav>
    </header>
    <message :message="message" :status="messageStatus" :showMessage="showMessage"></message>
    <router-view :authenticated="authenticated"></router-view>
  </div>
</template>

<script>
  import DropDown from './components/dropdown.vue'
  import Message from './components/message.vue'
  import bus from './bus'
  import controller from './controllers/controller';

  export default {
    name: 'app',
    components: { DropDown, Message },
    data () {
      return {
        dropDownClicked: false,
        authenticated: false,
        showMessage: false,
        message: '',
        messageStatus: true
      }
    },
    created () {
      this.getAuthentication();
    },
    mounted () {
      bus.$on('authentication', this.authenticate);
      if (this.authenticated) {
        this.getProfile();
      }
    },
    methods: {
      authenticate (authStatus) {
        this.authenticated = authStatus;
        window.localStorage.setItem('authentication', authStatus);
        this.message = authStatus ? 'Logged in!' : 'Logged out!';
        this.messageStatus = true;
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false
        }, 2000);
      },
      getAuthentication () {
        const authentication = window.localStorage.getItem('authentication');
        const authValid = JSON.parse(authentication);
        if (authValid) {
          this.authenticated = authValid;
        }
      },
      //TODO improve so doesn't call every time load
      getProfile () {
        controller.getProfile().then(res => {
          if (res) {
            const profileString = JSON.stringify(res);
            console.log(profileString);
            window.localStorage.setItem('profile', profileString);
          }
        })
      }
    }
  }
</script>

<style lang="css">
  @import '~bulma/css/bulma.css';
  @import '../node_modules/font-awesome/css/font-awesome.min.css';

  nav {
    background-color: lightgray;
  }

  #dropdown {
    float: right;
  }

  .container {
    margin-left: 8em !important;
    margin-right: 8em !important;
  }


</style>
