<template>
    <v-pagination
            v-model="selected_page"
            color="#c1c1ff"
            circle
            :length="length">
    </v-pagination>
</template>

<script>
    export default {
        props:{
            current_page: {
                type: Number,
                required: true
            },
            last_page: {
                type: Number,
                required: true
            },
        },
        data:function(){
            return {
                selected_page:this.current_page,
                length:this.last_page,
            }
        },
        watch: {
            selected_page: function(new_page) {
                this.$router.push({ path: '', query: { page: new_page } })
            }
        },
    }
</script>

<style>
    .page-link {
        color:#454545!important;
    }
    .active .page-link {
        background-color: #454545!important;
        color: white!important;
    }
</style>