<template>
  <div id="dropdown-content">
    <router-link class="dropitem" :to="{ path: 'signin'}">Sign In</router-link>
    <router-link class="dropitem" :to="{ path: 'profile'}">Profile</router-link>
  </div>
</template>

<script>
  export default {
    name: 'drop-down',
    data () {
      return {}
    }
  }

</script>

<style>
  #dropdown-content {

  }

  #dropdown-content p {
    display: block;
  }

  .dropitem:hover {
    background-color: #f1f1f1;
  }
</style>
