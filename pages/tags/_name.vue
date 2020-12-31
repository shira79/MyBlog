<template>
  <v-container class="tag-show">
      <Loading :state="loading"></Loading>
      <div v-if="!loading">
        <h2>#{{tag.fields.jaName}}</h2>
        <!-- ↑毎回取得してるのよくない -->
        <Blogs :blogs="bloglist"></Blogs>
        <Pagination :current_page=page :last_page=last_page></Pagination>
      </div>
      <h3>全部のタグ</h3>
      <Tags :tags="tagList" :showCount="true"></Tags>
  </v-container>
</template>

<script>

import ContentfulAdapter from '../../plugins/contentful.js'
import Loading from '../../components/Loading.vue'
import Blogs from '../../components/Blogs.vue'
import Tags from '../../components/Tags.vue'
import Pagination from '../../components/Pagination.vue'

export default {
  components: { Loading, Blogs, Tags, Pagination},
  props:{ enName: String },
  data:function(){
    return {
        tagList:[],
        tag:[],
        bloglist:[],
        page:1,
        last_page:0,
        loading:false,
    }
  },
  methods:{
    setData(){
        var vm = this;
        vm.loading =  true;
        ContentfulAdapter.getTagList()
        .then(function (entry) {
            vm.tagList = entry.items;
        })
        .catch(function(){
          alert("タグの一覧が取得できませんでした");
        })
        //これは非同期でいい

        if(vm.$route.query.page !== undefined){
          vm.page = Number(vm.$route.query.page);
        }

        ContentfulAdapter.getTagByEnName(vm.enName)
        .then(function (entry) {
            vm.tag = entry.items[0];

            ContentfulAdapter.getBlogByTagId(vm.tag.sys.id,vm.page)
            .then(function (entry) {
                vm.bloglist = entry.items;
                vm.last_page = ContentfulAdapter.getLastPage(entry.total);
                vm.loading =  false;
            })
            .catch(function(){
              alert("記事が取得できませんでした");
            })
        })
        .catch(function(){
          alert("タグ名が取得できませんでした");
        })
      }
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

.tag-show{
    text-align:left;
    max-width:680px;
}

</style>
