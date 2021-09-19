<template>
    <v-container>
        <ul class="pagenation">
            <li>
                <nuxt-link :to="getTargetPath(current_page-1)" :class="{'is-disabled':current_page-1<1 }" >
                    <button class="page-btn" ><</button>
                </nuxt-link>
            </li>
            <li v-for="page in last_page" :key="page">
                <nuxt-link :to="getTargetPath(page)">
                    <button class="page-btn" :class="{'selected':page==current_page }">{{page}} </button>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="getTargetPath(current_page+1)" :class="{'is-disabled':current_page+1>last_page }">
                    <button class="page-btn">></button>
                </nuxt-link>
            </li>
        </ul>
    </v-container>
</template>

<script>
    export default {
        data: function(){
            return {
                current_page:this.$route.params.page !== undefined ? Number(this.$route.params.page) : 1
            }
        },
        props:{
            last_page: {
                type: Number,
                required: true
            },
        },
        methods:{
            getTargetPath(target_page){

                //pageが不正だったら空文字を返す。現在のパスを指定
                if(target_page<1 || target_page>this.last_page) return "";

                const path = this.removeTrailingSlash(this.$route.path)

                //// 1ページ目のパスを生成する場合
                if(target_page == 1){
                    // 現在が1ページ目の場合
                    if(this.current_page == 1){
                        return path
                    }

                    let target_path = path.replace(this.current_page, '')

                    // ルートパスの場合、トレイリングスラッシュを削除せずに返却
                    if(target_path === '/'){
                        return target_path
                    }
                    return this.removeTrailingSlash(target_path)
                }

                //// 1ページ目以外のパスを生成する場合
                // 現在が1ページ目の場合
                if(this.current_page == 1){
                    return path + '/' + target_page
                }

                let target_path = path.replace(this.current_page, target_page)
                return this.removeTrailingSlash(target_path)

            },
            removeTrailingSlash(url) {
                return url.replace(/\/$/, '')
            }
        },
    }
</script>

<style>
    .pagenation {
        display: flex;
        justify-content: center;
        list-style: none;
    }

    .pagenation li {
        text-decoration: none;
    }

    .page-btn {
        width: 30px;
        height:30px;
        line-height:30px;
        font-size: 15px;
        margin: 0px 5px;
        box-shadow: inset 0 2px 0 rgba(255,255,255,0.5), 0 2px 2px rgba(0, 0, 0, 0.19);
        border-radius: 50%;
        font-weight: 500;
        color :black;
    }

    .page-btn:disabled {
        color:rgba(0, 0, 0, 0.19)
    }

    .is-disabled {
        pointer-events: none;
        color:rgba(0, 0, 0, 0.19);
        opacity: .5;
    }

    .selected {
        background-color: var(--theme);
        border-style: none;
        box-shadow: none;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 1px rgba(0, 0, 0, 0.19);
        color :white;
    }
</style>