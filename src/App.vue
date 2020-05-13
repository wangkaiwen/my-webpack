<template>
    <div>
        哈哈哈{{title}}
        <img src="/ava.png" alt="">
        <img src="./2222.jpg" alt="">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title:'aabbba'
            }
        },
        created() {
            console.log(11111)
        },
        methods: {

        }
    }
</script>

<style scoped src="./index.css"></style>
<style scoped >
    div{
        color: red;
    }
</style>