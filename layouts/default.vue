<template>
  <v-app>
    <v-container class="nav">
      <v-layout class="tabs">
        <nuxt-link to="/" class="tab">home</nuxt-link>
        <v-spacer></v-spacer>
        <nuxt-link to="/about" class="tab">about</nuxt-link>
        <nuxt-link to="/tags" class="tab">tags</nuxt-link>
      </v-layout>
    </v-container>
    <nuxt/>
  </v-app>
</template>


<style>
.nav {
    height:80px;
}

.tabs {
    height:100%;
}
</style>

<style>
@import "../node_modules/github-markdown-css/github-markdown.css";
@import "../node_modules/highlight.js/styles/github-gist.css";

#app {
  /* カラー変数 */
  --theme: #6cb0b5;
  --sub: #7f8d8e;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  min-height: 100vh;
}

.tab {
  color: black!important;
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

.markdown-body pre code {
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
  color: black!important;
  font-weight: lighter!important;
}

.markdown-body a {
  color: var(--theme)!important;
}

.table-of-contents {
    background: #F6F8FA;
    padding:20px 0 20px;
}
.table-of-contents ul {
    list-style-type: none;
}
.table-of-contents a {
    color:#333!important;
}
.table-of-contents a:hover {
    color: var(--theme)!important;
}

@media screen and (min-width: 1400px) and (orientation: landscape)  {
    .table-of-contents {
        position: fixed;
        top: 160px;
        left: calc(100vw - 330px);
        width:330px;
        font-size: 0.75em;
        background: inherit;
    }
    .table-of-contents ul {
        padding:0 8px;
    }
    .table-of-contents li {
        padding:0 8px;
    }
}

</style>
