import colors from 'vuetify/es5/util/colors'
import ContentfulAdapter from './plugins/contentful.js'
import MarkdownIt from 'markdown-it';

const DOMAIN        = 'shira79.dev'
const BASE_URL      = 'https://shira79.dev'
const MY_NAME       = 'shira79'
const BLOG_TITLE    = 'shira79.dev'
const OGP_IMAGE_TOP = 'https://res.cloudinary.com/shlia34-com/image/upload/v1610548609/top_u28dey.jpg'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '',
    title: BLOG_TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Hello, My Friend. I'm shira, a web developer." },
      { hid: 'og:title', name: 'og:title', content: BLOG_TITLE },
      { hid: 'og:url', name: 'og:url', content: BASE_URL },
      { hid: 'og:image', name: 'og:image', content: OGP_IMAGE_TOP },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@Twitter' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'alternate', type: 'application/rss+xml', href: '/feed.xml', title: 'RSS2.0 Feed' }
    ]
  },

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
    '@nuxtjs/sitemap',
    '@nuxtjs/feed',
    '@nuxtjs/google-gtag'
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
    hostname: BASE_URL,
    path: '/sitemap.xml',
  },

  generate: {
    fallback: true,
    async routes() {

      var ret = [];

      ret.push('/');
      ret.push(`/about`);

      const AllBlogs = await ContentfulAdapter.getAllBlogs()

      //blog/_id
      await Promise.all(AllBlogs.items.map(function(blog) {
          ret.push(`/blogs/${blog.sys.id}`);
      }))

      let blogLastPage = ContentfulAdapter.getLastPage(AllBlogs.total);
       //blog/list/_page
      await Promise.all([...Array(blogLastPage).keys()].map(function(page) {
          if(page == 0){
              ret.push( `/blogs/list`);
          }else{
              ret.push(`/blogs/list/${page+1}`);
          }
      }))

      const TagList = await ContentfulAdapter.getAllTags();
      //tag/_enName/_page
      await Promise.all(TagList.items.map(async function(tag){
          let blogs = await ContentfulAdapter.getPaginatedBlogsByTagId(tag.sys.id);
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

  feed: [
    {
      path: '/feed.xml',
      type: "rss2",
      async create(feed) {
        feed.options = {
          title: BLOG_TITLE,
          link: BASE_URL + "/feed",
          description: BLOG_TITLE + "- feed"
        };

        const md = new MarkdownIt({
          html: true,
          typography: true,
        })

        // 記事を取得
        const AllBlogs = await ContentfulAdapter.getAllBlogs()

        AllBlogs.items.forEach(blog => {
          feed.addItem({
            title: blog.fields.title,
            id: BASE_URL + `/blogs/${blog.sys.id}`,
            link: BASE_URL + `/blogs/${blog.sys.id}`,
            //TODO descriptionはあとで対応
            // description: blog.fields.description,
            content: '<img src=' + '"https://res.cloudinary.com/shlia34-com/image/upload/l_text:Sawarabi%20Gothic_50_bold:' + encodeURIComponent(blog.fields.title) + ',w_450,c_fit/v1610548616/title_zm6zse.jpg'+ '">' + md.render(blog.fields.text),
            date: blog.fields.publishedAt ? new Date(blog.fields.publishedAt) : new Date(blog.sys.createdAt),
            published: new Date(blog.fields.publishedAt),
          });
        });
        feed.addCategory("blog");
        feed.addContributor({
          name: MY_NAME,
          link: BASE_URL
        });

      },
    }
  ],

  'google-gtag': {
    id: process.env.GOOGLE_ANALYTICS_ID,
    config: {
      linker: {
        //TODO shlia34.comはドメインの契約が終了したら外す
        domains: [ DOMAIN, 'shlia34.com', 'shira-nuxt-static.netlify.app']
      }
    },
    // debug: true,
  }
}
