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
        <home v-if="isHome" :polls="polls"></home>
        <button @click="test">Test it out</button>
        <sign-in v-if="isSignIn"></sign-in>
        <new-poll v-if="isNewPoll"></new-poll>
    </div>
</template>

<script>
import DropDown from './components/dropdown.vue'
import Home from './components/home.vue'
import SignIn from './components/signin.vue'
import NewPoll from './components/newpoll.vue'

import gateway from './controllers/clickController.client'

export default {
    name: 'app',
    components: {
      NewPoll,
      DropDown,
      Home,
      SignIn,
    },
    data() {
        return {
            dropDownClicked: false,
            //test data
            polls: [
                {id:1, name:"one"},
                {id:2, name:"two"}
            ]
        }
    },
    computed: {
      routerPath(){
        return this.$route.path;
      },
      isHome(){
        return this.routerPath === '/';
      },
      isSignIn(){
        return this.routerPath === '/signin'
      },
      isProfile(){
        return this.routerPath === '/profile'
      },
      isNewPoll(){
        return this.routerPath === '/newpoll'
      }
    },
    methods: {
      test(){
        gateway.updateClickCount();
        gateway.getClickCount();
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
    float:right;
}


</style>
