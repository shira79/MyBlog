import colors from 'vuetify/es5/util/colors'
import ContentfulAdapter from './plugins/contentful.js'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '',
    title: 'shlia34',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'うぇぶでべろっぱー!!!! がんばるぞ!!!!' },
      { hid: 'og:title', name: 'og:title', content: 'shlia34' },
      { hid: 'og:url', name: 'og:url', content: 'https://shlia34.com/' },
      { hid: 'og:image', name: 'og:image', content: 'https://res.cloudinary.com/shlia34-com/image/upload/v1610548609/top_u28dey.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@Twitter' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: "#42B2C1", },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap'
  ],

  markdownit: {
    breaks: true,
    use: [
        ['markdown-it-table-of-contents', {
            includeLevel: [2, 3],
        }],
        ['markdown-it-anchor'],
    ],
    highlight: (str, lang) => {
        const hljs = require('highlight.js');

        let ret;
        try {
            ret = '<pre class="hljs"><code>' + hljs.highlight(lang, str).value + '</code></pre>';
        }
        catch (e) {
            ret = '<pre class="hljs"><code>' + hljs.highlight('plaintext', str).value + '</code></pre>'
        }
        return ret;
      },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  sitemap: {
    // options
    hostname: 'http://shlia34.com',
    path: '/sitemap.xml',
  },

  generate: {
    fallback: true,
    async routes() {

      var ret = [];

      ret.push('/');
      ret.push(`/about`);

      const allBlogs = await ContentfulAdapter.getAllBlogs()

      //blog/_id
      await Promise.all(allBlogs.items.map(function(blog) {
          ret.push(`/blogs/${blog.sys.id}`);
      }))

      let blogLastPage = ContentfulAdapter.getLastPage(allBlogs.total);
       //blog/list/_page
      await Promise.all([...Array(blogLastPage).keys()].map(function(page) {
          if(page == 0){
              ret.push( `/blogs/list`);
          }else{
              ret.push(`/blogs/list/${page+1}`);
          }
      }))

      const tagList = await ContentfulAdapter.getTagList();
      //tag/_enName/_page
      await Promise.all(tagList.items.map(async function(tag){
          let blogs = await ContentfulAdapter.getBlogByTagId(tag.sys.id);
          let tagLastPage = ContentfulAdapter.getLastPage(blogs.total);
          [...Array(tagLastPage).keys()].map(function(page) {
              if(page == 0){
                  ret.push( `/tags/${tag.fields.enName}`);
              }else{
                  ret.push( `/tags/${tag.fields.enName}/${page+1}`);
              }
          })
      }))

      return ret;
    }
  },
}
