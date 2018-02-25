<template>
  <div id="dropdown-content">
    <ul>
      <router-link class="dropitem" v-if="!$parent.authenticated" :to="{ path: 'signin'}" tag="li">Sign In</router-link>
      <router-link class="dropitem" v-else :to="{ path: 'profile'}" tag="li">Profile</router-link>
      <li v-if="$parent.authenticated" @click="logout">Log Out</li>
    </ul>
  </div>
</template>

<script>
  import controller from '../controllers/controller'
  import bus from '../bus'

  export default {
    name: 'drop-down',
    data () {
      return {}
    },
    methods: {
      logout () {
        controller.logout().then(res => {
          if (!res) {
            console.log('Something happened, unable to logout');
          } else {
            bus.$emit('authentication', false);
          }
        })
      }
    }
  }

</script>

<style>
  #dropdown-content {

  }

  #dropdown-content p {
    display: block;
  }

  .dropitem {
    text-align: center;
    background-color: #6fe274;
    cursor: pointer;
  }

  .dropitem:hover {
    background-color: #33E252;
  }
</style>
