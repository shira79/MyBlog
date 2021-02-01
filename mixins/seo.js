export default {
    head() {
        return{
            title: this.meta.title + ' | shlia34',
            meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: this.meta.description },
            { hid: 'og:url', name: 'og:url', content: 'https://shlia34.com/' },
            { hid: 'og:image', name: 'og:image', content: 'https://res.cloudinary.com/shlia34-com/image/upload/l_text:Sawarabi%20Gothic_50_bold:' + this.meta.title + ',w_450,c_fit/v1610548616/title_zm6zse.jpg' },
            ],
            link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },
}
