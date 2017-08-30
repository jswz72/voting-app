<template>
    <div class="container">
        <header>
            <nav id="navbar" class=" is-horizontal">
                <router-link to="/home" class="button is-primary">
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
        <home v-if="isHome" :polls="polls"></home>
        <sign-in v-if="isSignIn"></sign-in>
    </div>
</template>

<script>
import DropDown from './components/dropdown.vue'
import Home from './components/home.vue'
import SignIn from './components/signin.vue'

export default {
    name: 'app',
    components: {
      DropDown,
      Home,
      SignIn,
    },
    data() {
        return {
            dropDownClicked: false,
            //test data
            polls: [
                {name: 'poll1', id: 1 },
                {name: 'poll2', id: 2 },
                {name: 'poll3', id: 3 },
                {name: 'poll4', id: 4 }
            ]
        }
    },
    computed: {
      routerPath(){
        return this.$route.path;
      },
      isHome(){
        return this.routerPath === '/home';
      },
      isSignIn(){
        return this.routerPath === '/signin'
      }
    },
    methods: {

    }
}
</script>

<style lang="css">
@import '~bulma/css/bulma.css';

nav {
    background-color: lightgray;
}

#dropdown {
    float:right;
}


</style>
