<template>
    <tr>
        {{item.name}}
    </tr>
</template>

<script>
export default {
    name: 'poll-item',
    props: {
        item: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    }
}
</script>

<style>

tr {
    text-align: center;
    font-size: 1.5em;
}

tr:nth-child(even) {
    background-color: white;
}

tr:nth-child(odd){
    background-color: #e8ebef;
}
</style>
