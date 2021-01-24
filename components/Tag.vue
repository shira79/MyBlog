<template>
    <div class="tag">
        <nuxt-link class = "tag-link" :to="`/tags/${tag.fields.enName}`">
            #{{tag.fields.jaName}}<span v-if="showCount">({{count}})</span>
        </nuxt-link>
    </div>
</template>

<script>
import ContentfulAdapter from '../plugins/contentful.js'

export default {
    props: ['tag','showCount'],
    data:function(){
    return {
        count:0,
    }
  },
    methods:{
      setData(){
          var vm =  this;
        ContentfulAdapter.getBlogCountByTagId(this.tag.sys.id)
        .then(function (entry) {
            vm.count = entry.total;
          })
      },
    },
}

</script>


<style scoped>
.tag {
    margin-right: 8px;
}

.tag-link{
  color:#7f8d8e!important;
  text-decoration: none;
}

.tag-link:hover {
  color: #42B2C1!important;
  text-decoration: underline;
}

</style>

