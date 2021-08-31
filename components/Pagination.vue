<template>
    <v-container>
        <ul class="pagenation">
            <li>
                <nuxt-link :to="getTargetRoute(current_page-1)" :class="{'is-disabled':current_page-1<1 }" >
                    <button class="page-btn" ><</button>
                </nuxt-link>
            </li>
            <li v-for="page in last_page" :key="page">
                <nuxt-link :to="getTargetRoute(page)">
                    <button class="page-btn" :class="{'selected':page==current_page }">{{page}} </button>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="getTargetRoute(current_page+1)" :class="{'is-disabled':current_page+1>last_page }">
                    <button class="page-btn">></button>
                </nuxt-link>
            </li>
        </ul>
    </v-container>
</template>

<script>
    //TODO current_pageとbase_pathはrouterから取得すれば必要ないはず
    export default {
        props:{
            current_page: {
                type: Number,
                required: true
            },
            last_page: {
                type: Number,
                required: true
            },
            base_path: {
                type: String,
                required: true
            },
        },
        methods:{
            getTargetRoute(page){
                //pageが不正だったら空文字を返す。現在のパスを指定
                if(page<1 || page>this.last_page) return "";

                if(page == 1){
                    return `${this.base_path}`;
                } else {
                    return `${this.base_path}/${page}`;
                }
            },
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
        background-color: #42B2C1;
        border-style: none;
        box-shadow: none;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 1px rgba(0, 0, 0, 0.19);
        color :white;
    }
</style>