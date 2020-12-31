<template>
    <div>
        <div class="publishedAt" v-if="publishedAt">{{formatPublishedAt(publishedAt)}}</div>
        <div class="publishedAt" v-else>unknown date</div>
    </div>
</template>


<script>
export default {
    name: 'publish_at',
    props: ['publishedAt'],
    methods:{
        formatPublishedAt(date){
        var result = date.split( 'T' );
        return result[0]
      }
    },
  }
</script>


<style>
.publishedAt {
  color: #7f8d8e;
}
</style>