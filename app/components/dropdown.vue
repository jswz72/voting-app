<template>
  <div id="dropdown-content">
    <ul>
      <router-link class="dropitem" :to="{ path: 'signin'}" tag="li">Sign In</router-link>
      <router-link class="dropitem" :to="{ path: 'profile'}" tag="li">Profile</router-link>
    </ul>
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

  .dropitem {
    text-align: center;
    background-color: #6fe274;
    cursor: pointer;
  }

  .dropitem:hover {
    background-color: #33E252;
  }
</style>
