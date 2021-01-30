import colors from 'vuetify/es5/util/colors'
import ContentfulAdapter from './plugins/contentful.js'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '',
    title: 'shlia',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
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
    '@nuxtjs/markdownit'
  ],

  markdownit: {
    breaks: true,
    langPrefix: '',
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

  generate: {
    fallback: true,
    async routes() {

        var ret = [];

        //tags/_enName/_page
        let tagRoutes = await ContentfulAdapter.getTagList()
        .then( entry =>  {
            entry.items.map(function(tag){
                ContentfulAdapter.getBlogByTagId(tag.sys.id)
                .then( entry => {
                    let pages = ContentfulAdapter.getLastPage(entry.total);
                    [...Array(pages).keys()].map(function(page) {
                        ret.push( `/tags/${tag.fields.enName}/${page+1}`);
                    })
                })
            })
        })

        //blogs/list/_page
        let blogRoutes =  await ContentfulAdapter.getBlogList()
        .then( entry => {
            let pages = ContentfulAdapter.getLastPage(entry.total);
            [...Array(pages).keys()].map(function(page) {
                ret.push(`/blogs/list/${page+1}`);
            })
        })

        return Promise.all([tagRoutes, blogRoutes]).then(values => {
            return ret;
        })
    }
  },
}
