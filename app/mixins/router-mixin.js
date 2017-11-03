export default {
  computed: {
    routerPath () {
      return this.$route.path;
    },
    isHome () {
      return this.routerPath === '/';
    },
    isSignIn () {
      return this.routerPath === '/signin'
    },
    isProfile () {
      return this.routerPath === '/profile'
    },
    isNewPoll () {
      return this.routerPath === '/newpoll'
    }
  }
}
