<template>
    <div>
        <input v-model="username" placeholder="Username">
        <input v-model="password" placeholder="*******">
    </div>
</template>

<script>
export default{
  name: 'sign-in',
  data(){
    return {
      username: "",
      password: "",
    }
  },
}
</script>

<style>

</style>