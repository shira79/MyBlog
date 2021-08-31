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
  color:var(--sub)!important;
  text-decoration: none;
}

.tag-link:hover {
  color: var(--theme)!important;
  text-decoration: underline;
}

</style>

