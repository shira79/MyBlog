<template>
  <v-container class="tag-show">
      <h2>全部のタグ</h2>
      <Tags :tags="tagList" :showCount="true"></Tags>
  </v-container>
</template>

<script>

import ContentfulAdapter from '../../plugins/contentful.js'
import Tags from '../../components/Tags.vue'
import seo from '../../mixins/seo'

export default {
    components: {Tags},
    mixins: [seo],
    async asyncData({route}){

        const TagListEntry = await ContentfulAdapter.getAllTags()
        let tagList = await Promise.all( TagListEntry.items.map(async function(tag) {
            let blogsEntries = await ContentfulAdapter.getBlogsByTagId(tag.sys.id)
            tag.total = blogsEntries.total
            return tag;
        }))

        return {
            meta : {
                title : 'タグ一覧',
                description : 'タグの記事の一覧',
                path : route.fullPath,
            },
            tagList : tagList,
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
