<template>
    <tr class="">
        {{item.title}}
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

</style>
