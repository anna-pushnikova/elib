<template lang="pug">
  .wrapper

    router-view

    Message
</template>

<script>
import Message from '@/components/message/message.vue'

export default {
  components: {
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