<template>
  <v-container class="blog-show">
      <v-layout column>
        <h1>{{title}}</h1>
        <Tags :tags="tags"></Tags>
        <PublishedAt :publishedAt="publishedAt"></PublishedAt>
        <v-col class="markdown markdown-body" v-html= "text"></v-col>
      </v-layout>
      <Socials :links="links"></Socials>
  </v-container>
</template>

<script>

import ContentfulAdapter from '../../plugins/contentful.js'
import marked from 'marked'
import hljs from 'highlight.js'
import Tags from '../../components/Tags.vue'
import PublishedAt from '../../components/PublishedAt.vue'
import Socials from '../../components/Socials.vue'

export default {
  components: { Tags, PublishedAt, Socials},
  props:{ id: String },
  async asyncData({params}){
      marked.setOptions({
        langPrefix: '',
        highlight: function(code, lang) {
          return hljs.highlightAuto(code, [lang]).value
        }
      });

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
          title :  BlogEntry.fields.title,
          text :  marked(BlogEntry.fields.text),
          slug :  BlogEntry.fields.slug,
          publishedAt :  BlogEntry.fields.publishedAt,
          tags :  BlogEntry.fields.tags,
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
