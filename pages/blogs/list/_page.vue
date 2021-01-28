<template>
  <v-container class="blogindex">
    <div>
        <Blogs :blogs="items"></Blogs>
        <Pagination :current_page=page :last_page=last_page base_path="/blogs/list"></Pagination>
    </div>
  </v-container>
</template>

<script>

import ContentfulAdapter from '../../../plugins/contentful.js'
import Blogs from '../../../components/Blogs.vue'
import Pagination from '../../../components/Pagination.vue'

export default {
    components:{  Blogs, Pagination },
    async asyncData({params}){
        const page = Number(params.page) || 1
        const getBlogListEntry = await ContentfulAdapter.getBlogList(page)
        .then( entry => {
            return entry;
        })
        .catch(function(){
            alert("記事一覧が取得できませんでした");
        })

        return {
            page : page,
            items : getBlogListEntry.items,
            last_page : ContentfulAdapter.getLastPage(getBlogListEntry.total),
        }
    },
  }
  </script>

<style scoped>
.blogindex {
  max-width: 680px;
}
</style>
