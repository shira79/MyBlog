<template>
  <v-container class="blog-show">
      <Loading :state="loading"></Loading>
      <v-layout column v-if="!loading">
        <h2>{{title}}</h2>
        <Tags :tags="tags"></Tags>
        <PublishedAt :publishedAt="publishedAt"></PublishedAt>
        <v-col class="markdown markdown-body" v-html=text></v-col>
      </v-layout>
  </v-container>
</template>

<script>

import ContentfulAdapter from '../../plugins/contentful.js'
import marked from 'marked'
import hljs from 'highlight.js'
import Loading from '../../components/Loading.vue'
import Tags from '../../components/Tags.vue'
import PublishedAt from '../../components/PublishedAt.vue'

export default {
  components: { Loading, Tags, PublishedAt},
  props:{ id: String },
  data:function(){
    return {
      loading:false,
      title:"",
      text:"",
      slug:"",
      tags:"",
      publishedAt:"",
    }
  },
  methods:{
    setData(){
      var vm = this;
      vm.loading =  true;
      ContentfulAdapter.getEntryById(this.$route.params.id)
        .then(function (entry) {
          vm.title =  entry.fields.title;
          vm.text =  marked(entry.fields.text);
          vm.slug =  entry.fields.slug;
          vm.publishedAt =  entry.fields.publishedAt;
          vm.tags =  entry.fields.tags;
          vm.loading =  false;
        })
        .catch(function(){
          alert("記事が取得できませんでした");
        })
      }
    },
    created :function(){
      marked.setOptions({
        langPrefix: '',
        highlight: function(code, lang) {
          return hljs.highlightAuto(code, [lang]).value
        }
      });

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

.blog-show{
    text-align:left;
    max-width:680px;
}

</style>
