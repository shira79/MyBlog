<template>
    <v-layout wrap>
        <div v-for="tag in tags" :key="tag.enName">
          <Tag :tag=tag :showCount=showCount></Tag>
        </div>
    </v-layout>
</template>


<script>
import Tag from '../components/Tag.vue'

export default {
    components: {Tag},
    props: ['tags','showCount'],
}
</script>

<style></style>