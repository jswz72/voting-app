<template>
    <header>
        <nav id="navbar">
            <button id="home">
                <router-link to="/">
                    FCC Voting App
                </router-link>
            </button>
            <div id="dialogbox">
                <button @click="dropDownClicked = !dropDownClicked">
                    SETTINGS
                </button>
                <drop-down v-if="dropDownClicked">
                </drop-down>
            </div>
            <div id="banner">
                <h1>Free Code Camp Voting App</h1>
                <p>Select a poll to see the results and vote, or sign-in to make a new poll</p>
            </div>
            <table>
                <tbody>
                    <poll-item v-for="(item, index) in polls" :item="item" :index="index" :key="item.id"></poll-item>
                </tbody>
            </table>
        </nav>
    </header>
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

<style>
#dialogbox {
    float: right;
}

</style>
