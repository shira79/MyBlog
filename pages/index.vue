<template>
  <v-container class = "home">
    <div class="text">
      <img height="160" src="/icon.png">
      <!-- <v-col class = "greeting">{{greeting}}</v-col> -->
      <v-col class = "message">{{message}}</v-col>
      <Socials :links=links></Socials>
    </div>
  </v-container>
</template>

<script>
import ContentfulAdapter from '../plugins/contentful.js'
import Socials from '../components/Socials.vue'

export default {
  name: 'home',
  components:{ Socials },
  async asyncData () {
    const TopEntry = await ContentfulAdapter.getTop()
    const SocialLinksEntry = await ContentfulAdapter.getSocialLinks()

    return {
        greeting : TopEntry.fields.title,
        message : TopEntry.fields.description,
        links : SocialLinksEntry.items,
    }
  }
}

</script>

<style>
.home {
  min-height: calc(100vh - 80px);
  text-align: center;
  position: relative;
}

.text {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 80%;
  height: 50vh;
}

.greeting {
  font-size: 60px;
  font-weight: bold;
  color:var(--theme);
}

.message {
  font-size: 20px;
}
</style>
