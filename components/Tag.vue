<template>
    <div class="tag">
        <nuxt-link class = "tag-link" :to="`/tags/${tag.fields.enName}`">
            #{{tag.fields.jaName}}<span v-if="showCount">({{tag.total}})</span>
        </nuxt-link>
    </div>
</template>

<script>

export default {
    props: ['tag','showCount'],
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

