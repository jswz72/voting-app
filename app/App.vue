<template>
    <div>
        <header>
            <nav id="navbar" class="columns">
                <div class="column is-8 is-offset-2">
                <router-link to="/" id="home" class="button is-primary">
                    FCC Voting App
                </router-link>
                <div id="dialogbox">
                    <button class="button is-success" @click="dropDownClicked = !dropDownClicked">
                        SETTINGS
                    </button>
                    <drop-down v-if="dropDownClicked"></drop-down>
                </div>
            </div>
            </nav>
        </header>
        <div class="columns">
            <div id="textbox" class="column is-half is-offset-one-quarter">
                <h1>Free Code Camp Voting App</h1>
                <p>Select a poll to see the results and vote, or sign-in to make a new poll</p>
            </div>
        </div>
        <div class="columns">
            <table class="column is-10 is-offset-2">
                <tbody>
                    <poll-item v-for="(item, index) in polls" :item="item" :index="index" :key="item.id"></poll-item>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import DropDown from './components/dropdown.vue'
import PollItem from './components/poll-item.vue'

export default {
    name: 'app',
    components: {
        DropDown,
        PollItem
    },
    mounted(){
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
    methods: {

    }
}
</script>

<style lang="css">
@import '~bulma/css/bulma.css';

nav {
    background-color: gray;
}
#dialogbox {
    float: right;
}

#textbox {
    margin-top: 70px;
    text-align: center;
}

#textbox h1 {
    font-size: 3em;
}

#textbox p {
    font-size: 1.2em;
}

drop-down {
    margin-top:25px;
    display: block;
}


</style>
