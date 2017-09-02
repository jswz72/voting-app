<template>
    <div>
        <div>
            <div id="textbox" class="column is-half is-offset-one-quarter">
                <h1>Free Code Camp Voting App</h1>
                <p>Select a poll to see the results and vote, or sign-in to make a new poll</p>
            </div>
        </div>
        <div>
            <table align="center"class="table is-striped">
                <tbody>
                    <poll-item v-if="polls.length > 0" v-for="(item, index) in polls" :item="item" :index="index" :key="item.id"></poll-item>
                    <tr v-if="polls.length == 0">No polls found!</tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import PollItem from './poll-item.vue'

export default {
  name: 'home',
  components: {
    PollItem,
  },
  props: {
      polls: {
          type: Array,
          required: true,
      }
  },
  mounted(){
      console.log(this.polls.length);
  }
}

</script>

<style>
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


tr {
    text-align: center;
    font-size: 1.5em;
}

/*tr:nth-child(even) {
    background-color: white;
}

tr:nth-child(odd){
    background-color: #e8ebef;
}*/
</style>
