const BASE_URL   = 'https://shira79.dev'
const BLOG_TITLE = 'shira79.dev'

export default {
    head() {
        return{
            title: this.meta.title + ' | ' + BLOG_TITLE,
            meta: [
                { hid: 'description', name: 'description', content: this.clipDescription(this.meta.description) },
                { hid: 'og:title', name: 'og:title', content: this.meta.title + ' | ' + BLOG_TITLE },
                { hid: 'og:url', name: 'og:url', content: BASE_URL + this.meta.path },
                { hid: 'og:image', name: 'og:image', content: this.getOgpImage(this.meta.title)  },
                { hid: 'twitter:image', name: 'twitter:image',content: this.getOgpImage(this.meta.title)}
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },
    methods: {
        clipDescription: function(description=''){
            const max_length = 100;
            if(description.length > max_length){
                return description.substr(0, max_length) + '...';
            }else{
                return description;
            }
        },
        getOgpImage(title){
            return 'https://res.cloudinary.com/shlia34-com/image/upload/l_text:Sawarabi%20Gothic_50_bold:' + encodeURIComponent(title) + ',w_450,c_fit/v1610548616/title_zm6zse.jpg'
        }
    }
}
