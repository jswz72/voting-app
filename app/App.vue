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
    <router-view :authenticated="authenticated"></router-view>
  </div>
</template>

<script>
  import DropDown from './components/dropdown.vue'
  import bus from './bus'

  export default {
    name: 'app',
    components: { DropDown },
    data () {
      return {
        dropDownClicked: false,
        authenticated: false
      }
    },
    created () {
      this.getAuthentication();
    },
    mounted () {
      bus.$on('authentication', this.authenticate);
    },
    methods: {
      authenticate (authStatus) {
        this.authenticated = authStatus;
        window.localStorage.setItem('authentication', authStatus);
      },
      getAuthentication () {
        const authentication = window.localStorage.getItem('authentication');
        const authValid = JSON.parse(authentication);
        if (authValid) {
          this.authenticated = authValid;
        }
        console.log(this.authenticated);
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
