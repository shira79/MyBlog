<template>
  <v-container class="tag-show">
      <div>
        <h2>#{{tag.fields.jaName}}</h2>
        <Blogs :blogs="bloglist"></Blogs>
        <Pagination :current_page=page :last_page=last_page :base_path="`/tags/${tag.fields.enName}`"></Pagination>
      </div>
      <h3>全部のタグ</h3>
      <Tags :tags="tagList" :showCount="true"></Tags>
  </v-container>
</template>

<script>

import ContentfulAdapter from '../../../plugins/contentful.js'
import Blogs from '../../../components/Blogs.vue'
import Tags from '../../../components/Tags.vue'
import Pagination from '../../../components/Pagination.vue'
import seo from '../../../mixins/seo'

export default {
    components: { Blogs, Tags, Pagination},
    props:{ enName: String },
    mixins: [seo],
    async asyncData({params,route}){

        const TagEntry = await ContentfulAdapter.getTagByEnName(params.enName)

        const Page = Number(params.page) || 1;
        const BlogEntry =  await ContentfulAdapter.getPaginatedBlogsByTagId(TagEntry.items[0].sys.id ,Page)

        if(BlogEntry.items.length == 0) return {}
        //意図的にエラー出す

        const TagListEntry = await ContentfulAdapter.getAllTags()
        let tagList = await Promise.all( TagListEntry.items.map(async function(tag) {
            let blogsEntries = await ContentfulAdapter.getBlogsByTagId(tag.sys.id)
            tag.total = blogsEntries.total
            return tag;
        }))

        return {
            meta : {
                title : '#' + TagEntry.items[0].fields.jaName,
                description : TagEntry.items[0].fields.jaName + 'タグの記事の一覧',
                path : route.fullPath,
            },
            page : Page,
            last_page : ContentfulAdapter.getLastPage(BlogEntry.total),
            tagList : tagList,
            tag : TagEntry.items[0],
            bloglist : BlogEntry.items,
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
