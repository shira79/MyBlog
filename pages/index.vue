<template>
  <v-container class = "top">
    <Loading :state="loading"></Loading>
    <div class="text">
      <v-col class = "greeting">{{greeting}}</v-col>
    <v-col class = "message">{{message}}</v-col>
    </div>
  </v-container>
</template>

<script>
import ContentfulAdapter from '../plugins/contentful.js'
import Loading from '../components/Loading.vue'

export default {
  name: 'Top',
  components:{ Loading },
  data: function(){
    return {
      greeting: null,
      message: null,
    }
  },
  created :function(){
    this.setData();
  },
  methods:{
    setData(){
      var vm = this;
      vm.loading = true;
      ContentfulAdapter.getTop()
        .then(function (entry) {
          vm.greeting = entry.fields.title;
          vm.message = entry.fields.description;
          vm.loading = false;
        })
        .catch(function(){
          alert("挨拶文が取得できませんでした");
        })
    }
  }
}
</script>

<style>
.top {
  min-height: calc(100vh - 80px);
  text-align: center;
  position: relative;
}

.text {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 80%;
  height: 50vh;
}

.greeting {
  font-size: 60px;
  font-weight: bold;
  color:#c1c1ff;
}

.message {
  font-size: 20px;
}
</style>
