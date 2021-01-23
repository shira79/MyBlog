<template>
  <v-container class="tag-show">
      <div>
        <h2>#{{tag.fields.jaName}}</h2>
        <Blogs :blogs="bloglist"></Blogs>
        <!-- <Pagination :current_page=page :last_page=last_page></Pagination> -->
      </div>
      <h3>全部のタグ</h3>
      <Tags :tags="tagList"></Tags>
      <!-- <Tags :tags="tagList" :showCount="true"></Tags> -->
  </v-container>
</template>

<script>

import ContentfulAdapter from '../../plugins/contentful.js'
import Blogs from '../../components/Blogs.vue'
import Tags from '../../components/Tags.vue'
import Pagination from '../../components/Pagination.vue'

export default {
    components: { Blogs, Tags, Pagination},
    props:{ enName: String },
    async asyncData({params}){
        const TagEntry = await ContentfulAdapter.getTagByEnName(params.enName)
        .then( entry => {
            return entry;
        }).catch(function(){
            alert("タグが取得できませんでした");
        })

        const BlogEntry = await ContentfulAdapter.getBlogByTagId(TagEntry.items[0].sys.id)
        .then( entry => {
            return entry;
        }).catch(function(){
            alert("記事が取得できませんでした");
        })

        const TagList = await ContentfulAdapter.getTagList()
        .then(  entry =>  {
            return entry.items;
        }).catch(function(){
            alert("タグ一覧が取得できませんでした");
        })

        return {
            tagList :  TagList,
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
