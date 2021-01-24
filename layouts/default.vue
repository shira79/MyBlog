<template>
  <v-app>
    <v-container class="nav">
      <v-layout class="tabs">
        <a href="/" class="tab">top</a>
        <v-spacer></v-spacer>
        <a href="/about" class="tab">about</a>
        <a href="/blogs" class="tab">blog</a>
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

.tab {
  color: #2c3e50!important;
  align-items: center;
  cursor: pointer;
  display: flex;
  flex: 0 1 auto;
  font-size: 0.875rem;
  font-weight: 500;
  justify-content: center;
  letter-spacing: 0.0892857143em;
  line-height: normal;
  min-width: 90px;
  max-width: 360px;
  outline: none;
  padding: 0 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: none;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
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

