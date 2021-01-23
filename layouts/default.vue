<template>
  <v-app>
    <v-container class="nav">
      <v-layout class="tabs">
        <v-tab to="/">Top</v-tab>
        <v-spacer></v-spacer>
        <v-tab to="/about">about</v-tab>
        <v-tab to="/blogs">blog</v-tab>
      </v-layout>
    </v-container>
    <nuxt/>
  </v-app>
</template>


<style>
.nav {
    height:80px;
    /* position: fixed; */
}

.tabs {
    height:100%;
}
</style>

<style>
@import "../node_modules/github-markdown-css/github-markdown.css";
@import "../node_modules/highlight.js/styles/github-gist.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

.markdown-body code {
  background-color: transparent !important;
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

.markdown-body code {
  color: #24292E!important;
  font-weight: lighter!important;
}

.markdown-body a {
  color: #42B2C1!important;
}

</style>

