<template>
    <v-pagination
            v-model="selected_page"
            color="#42B2C1"
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
            base_path: {
                type: String,
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
                if(new_page == 1)new_page = "";
                this.$router.push({ path: `${this.base_path}/${new_page}` })
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