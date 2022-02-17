<template>
  <div id="app" class="flex flex-col">
      <!-- top header -->
      <div class="sticky top-0 z-20">
        <topHeader/>
      </div>
      <!-- main aria -->
      <div class="flex-1 relative">
        <router-view></router-view>
      </div>
  </div>
</template>
<script>
// import axios from 'axios'
import topHeader from './components/topHeader.vue'
export default {
  watch: {
  },
  name: 'App',
  components: { 
    topHeader
  },
  async mounted(){
    // this.$store.dispatch('setAdmin','yesss')
    // let baseUrl = this.$store.state.admin
    // console.log(baseUrl);
    // // try{
    // //   const response =  await axios.get('https://api.publicapis.org/entries')

    // //   console.log(response)
    // // }
    // // catch(err){
    // //   console.log(err)
    // // }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #e4e7eb;
  height: 100vh;
  width: 100vw;
  overflow-x:hidden;
  box-sizing: border-box;
}
</style>
