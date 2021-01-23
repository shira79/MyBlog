<template>
  <v-container class="blogindex">
    <div>
        <Blogs :blogs="items"></Blogs>
      <!-- <Pagination :current_page=page :last_page=last_page></Pagination> -->
    </div>
  </v-container>
</template>

<script>

import ContentfulAdapter from '../../plugins/contentful.js'
import Blogs from '../../components/Blogs.vue'
import Pagination from '../../components/Pagination.vue'

export default {
    components:{  Blogs, Pagination },
    watchQuery: true,
    //pagonatoinはいつか取り組むので残しておく
    // methods:{
        // paging(items){
        //     const step = ContentfulAdapter.limitNum;
        //     const firstItem = (this.page - 1) * step;

        //     var paginated = [];
        //     for (var i = firstItem ; i < firstItem + step; i++) {
        //         if(items[i] === undefined) break;
        //         paginated.push(items[i]);
        //     }

        //     return paginated
        // }
    // },
    async asyncData({query}){
        const page = Number(query.page) || 1
        const getBlogListEntry = await ContentfulAdapter.getBlogList()
        .then( entry => {
            return entry;
        })
        .catch(function(){
            alert("記事一覧が取得できませんでした");
        })

        return {
            page : page,
            items : getBlogListEntry.items,
            // last_page : ContentfulAdapter.getLastPage(getBlogListEntry.total),
        }
    },
  }
  </script>

<style scoped>
.blogindex {
  max-width: 680px;
}
</style>
