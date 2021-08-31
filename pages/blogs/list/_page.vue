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
import seo from '../../../mixins/seo'

export default {
    components:{  Blogs, Pagination },
    mixins: [seo],
    async asyncData({params,route}){
        const Page = Number(params.page) || 1
        const BlogsEntry = await ContentfulAdapter.getPaginatedBlogs(Page)

        if(BlogsEntry.items.length == 0) return {}
        //意図的にエラー出す

        return {
            meta : {
              title : '記事一覧',
              description : '記事の一覧',
              path : route.fullPath,
            },
            page : Page,
            items : BlogsEntry.items,
            last_page : ContentfulAdapter.getLastPage(BlogsEntry.total),
        }
    },
  }
  </script>

<style scoped>
.blogindex {
  max-width: 680px;
}
</style>
