<template>
    <v-layout align-center justify-center mt-8 mb-4>
        <a v-for="link in links" :key=link.name :href="link.fields.url" target = "_blank" class="social-link mr-2">
            <v-icon color=var(--theme)>mdi-{{link.fields.fontAwesomeIcon}}</v-icon>
        </a>
    </v-layout>
</template>

<script>

export default {
    props: ['links'],
}

</script>

<style>
.social-link {
    text-decoration: none;
}

.v-icon {
    font-size: 24px
}

</style>
