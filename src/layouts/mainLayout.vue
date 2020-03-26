<template lang="pug">
.wrapper
  Navbar

  router-view

  Message
</template>

<script>
import Navbar from '@/components/Nav.vue'
import Message from '@/components/message/message'

export default {
  components: {
    Navbar,
    Message
  }
}
</script>

<style lang="stylus">
.body
  display flex
  justify-content space-between
  align-items center
.message-title
  margin-right 8px
.button-close
  opacity .9
  width 14px
  height @width
  &:before,
  &:after
    // TODO FIX background-color
    background #fff
</style>