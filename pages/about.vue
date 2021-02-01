<template>
  <div>
    <v-container class="about" xs=10>
      <h1>ABOUT</h1>
      <img height="160" width="160" src="/icon.gif">
      <img height="160" width="160" src="/icon.gif">
      <img height="160" width="160" src="/icon.gif">
      <img height="160" width="160" src="/icon.gif">
      <v-col class="markdown-body" v-html=$md.render(aboutMe.fields.description)></v-col>
      <Socials :links=links></Socials>
    </v-container>
  </div>
</template>

<script>

import ContentfulAdapter from '../plugins/contentful.js'
import Socials from '../components/Socials.vue'
import seo from '../mixins/seo'

 export default {
    components:{ Socials },
    mixins: [seo],
    async asyncData(){
        const aboutMeEntry = await ContentfulAdapter.getAboutMe()
        .then(  entry => {
            return entry;
        }).catch(function(){
            alert("aboutが取得できませんでした");
        });

        const SocialLinksEntry = await ContentfulAdapter.getSocialLinks()
        .then( entry => {
              return entry;
        })
        .catch(function(){
            alert("ソーシャルリンクが取得できませんでした");
        })

        return {
            meta  :{
              title: 'About',
            },
            aboutMe :aboutMeEntry,
            links : SocialLinksEntry.items,
        }
    }
}
</script>

<style scoped>

.about{
  max-width:680px;
  text-align:left;
}

.about-image {
  width:100%;
}

.about-text {
  text-align:left;
  font-size: 20px;
  white-space: pre-wrap;
}

@media screen and (max-width: 480px) {
  .about-image {
    width:100%;
  }
}


</style>
