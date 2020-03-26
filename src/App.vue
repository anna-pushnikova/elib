<template lang="pug">
  div#app
    component(
      :is="layout"
    )
      router-view
      
</template>
<script>
import MainLayout from '@/layouts/mainLayout'
import AuthLayout from '@/layouts/authLayout'

export default {
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta.layout || 'auth') + '-layout'
    }
  },
  components: {
    AuthLayout,
    MainLayout
  }
}
</script>
<style lang="stylus">
@import './assets/stylus/main.styl'
</style>
