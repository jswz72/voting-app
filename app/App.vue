<template>
  <div class="container">
    <header>
      <nav id="navbar" class=" is-horizontal">
        <router-link to="/" class="button is-primary">
          FCC Voting App
        </router-link>
        <div id="dropdown">
          <button class="button is-success" id="dropbtn" @click="dropDownClicked = !dropDownClicked">
            SETTINGS
          </button>
          <drop-down v-if="dropDownClicked"></drop-down>
        </div>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        dropDownClicked: false
      }
    }
  }
</script>

<style lang="css">
  @import '~bulma/css/bulma.css';

  nav {
    background-color: lightgray;
  }

  #dropdown {
    float: right;
  }


</style>
