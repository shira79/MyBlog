<template>
  <v-container class="blog-show">
      <v-layout column>
        <h1>{{blog.fields.title}}</h1>
        <Tags :tags="blog.fields.tags"></Tags>
        <PublishedAt :publishedAt="blog.fields.publishedAt"></PublishedAt>
        <v-col class="markdown markdown-body" v-html= "$md.render(`[[toc]]\n` + blog.fields.text)"></v-col>
      </v-layout>
      <Socials :links="links"></Socials>
  </v-container>
</template>

<script>

import ContentfulAdapter from '../../plugins/contentful.js'
import Tags from '../../components/Tags.vue'
import PublishedAt from '../../components/PublishedAt.vue'
import Socials from '../../components/Socials.vue'

export default {
  components: { Tags, PublishedAt, Socials},
  props:{ id: String },
  async asyncData({params}){

      const BlogEntry = await ContentfulAdapter.getEntryById(params.id)
      .then(  entry => {
          return entry;
      }).catch(function(){
          alert("記事が取得できませんでした");
      });

      const SocialLinksEntry = await ContentfulAdapter.getSocialLinks()
      .then( entry => {
            return entry;
      }).catch(function(){
          alert("ソーシャルリンクが取得できませんでした");
      })

      return {
          blog : BlogEntry,
          links : SocialLinksEntry.items,
      }
  },
}
  </script>

<style scoped>

.blog-show{
    text-align:left;
    max-width:870px;
}

</style>
