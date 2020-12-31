<template>
  <v-container class="blogindex">
    <Loading :state="loading"></Loading>
    <div v-if="!loading">
      <Blogs :blogs="items"></Blogs>
      <Pagination :current_page=page :last_page=last_page></Pagination>
    </div>
  </v-container>
</template>

<script>

import ContentfulAdapter from '../../plugins/contentful.js'
import Loading from '../../components/Loading.vue'
import Blogs from '../../components/Blogs.vue'
import Pagination from '../../components/Pagination.vue'

export default {
    components:{ Loading, Blogs, Pagination },
    data:function(){
      return {
        loading:false,
        items:[],
        page:1,
        last_page:0,
      }
    },
    methods:{
      setData(){
        var vm = this;

        if(vm.$route.query.page !== undefined){
          vm.page = Number(vm.$route.query.page);
        }
        vm.loading = true;
        ContentfulAdapter.getBlogList(vm.page)
          .then(function (entry) {
            vm.items = entry.items;
            vm.last_page = ContentfulAdapter.getLastPage(entry.total);
            vm.loading = false;
          })
          .catch(function(){
            alert("記事一覧が取得できませんでした");
          })
      },
    },
    created :function(){
      this.setData();
    },
    watch: {
      $route () {
        this.setData();
      }
    },
  }
  </script>

<style scoped>
.blogindex {
  max-width: 680px;
}
</style>
