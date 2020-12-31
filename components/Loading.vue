<template>
    <v-col v-if="state" class="loading" indeterminate color="primary" center>🖕( ^ω^ )🖕</v-col>
</template>

<script>
  export default {
    name: 'Loading',
    props: {
      state: Boolean,
    },
  }
  //todo 親コンポーネントのloadingもこっちで引き受ける。
</script>

<style>
.loading {
    text-align:center;
}
</style>
