<template>
    <div id="dropdown-content">
        <p>Thing 1</p>
        <p>Thing 2</p>
        <p>Thing 3</p>
        <p>Thing 4</p>
    </div>
</template>

<script>
export default {
    name: 'drop-down',
    data() {
        return {
        }
    }
}

</script>

<style>
#dropdown-content: {
    display:none;
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index:1;
}

#dropdown-content p {
    display: block;
}

#dropdown-content p:hover {
    background-color: #f1f1f1;
}
</style>
