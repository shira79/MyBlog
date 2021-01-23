<template>
    <v-layout column>
        <v-col class="blog-item" v-for="blog in blogs" :key="blog.title">
            <h3><router-link class="blog-link" :to="`/blogs/${blog.sys.id}`">{{blog.fields.title}}</router-link></h3>
            <Tags :tags="blog.fields.tags"></Tags>
            <PublishedAt :publishedAt="blog.fields.publishedAt"></PublishedAt>
        </v-col>
    </v-layout>
</template>

<script>

import Tags from '../components/Tags.vue'
import PublishedAt from '../components/PublishedAt.vue'

export default {
    props: ['blogs'],
    components:{ Tags, PublishedAt },
  }
</script>

<style>

.blog-item {
  border-bottom:thin solid #7f8c8d;
  text-align: left;
  color:#7f8c8d;
  padding-top: 20px;
  margin-bottom: 30px;
}

.blog-link{
  color:black!important;
  text-decoration: none;
}

.blog-link:hover {
  color: #42B2C1!important;
  text-decoration: underline;
}
</style>