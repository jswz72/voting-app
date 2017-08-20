<template>
    <header>
        <nav id="navbar">
            <button id="home">
                FCC Voting App
            </button>
            <div id="dialogbox">
                <button @click="dropDownClicked = !dropDownClicked">
                    SETTINGS
                </button>
                <drop-down v-if="dropDownClicked">
                </drop-down>
            </div>
        </nav>
    </header>
</template>

<script>
import DropDown from './components/dropdown.vue'

export default {
    name: 'app',
    components: {
        DropDown
    },
    data() {
        return {
            dropDownClicked: false
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
