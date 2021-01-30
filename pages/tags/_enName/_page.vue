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

export default {
    components: { Blogs, Tags, Pagination},
    props:{ enName: String },
    async asyncData({params}){

        const TagEntry = await ContentfulAdapter.getTagByEnName(params.enName)
        .then( entry => {
            return entry;
        })
        .catch(function(){
            alert("タグが取得できませんでした");
        })

        const page = Number(params.page) || 1;
        const BlogEntry =  await ContentfulAdapter.getBlogByTagId(TagEntry.items[0].sys.id ,page)
       .then( entry => {
            return entry;
        })
        .catch(function(){
            alert("記事が取得できませんでした");
        })

        const TagList = await ContentfulAdapter.getTagList()
        .then( entry =>  {
            let list = entry.items.map(function(tag) {
                return ContentfulAdapter.getBlogCountByTagId(tag.sys.id)
                .then( entry => {
                    tag.total = entry.total;
                    return tag;
                })
            })
            return Promise.all(list);
        })
        .catch(function(){
            alert("タグ一覧が取得できませんでした");
        })

        return {
            page : page,
            last_page : ContentfulAdapter.getLastPage(BlogEntry.total),
            tagList : TagList,
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
