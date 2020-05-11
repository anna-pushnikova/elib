<template lang="pug">
  .ui-tag(
    @click="addQuote = !addQuote"
  )
    .button-close(
      :class="{ active: addQuote }"
      @click="$emit('add')"
    )
</template>

<script>
export default {
  data: () => ({
    addQuote: false
  })
}
</script>

<style scoped lang="stylus">
.ui-tag
  background-color #444ce0
  display inline-block
  width 60px
  height @width
  border-radius 50%
  padding-top 12px
  padding-left 12px
  position fixed
  bottom 80px
  right 60px
  .button-close
    width 35px
    height @width
    display inline-block
    margin 0
    transform rotate(45deg)
    transition transform .5s ease-in-out
    &:before,
    &:after
      background-color: #fff
    &.active
      transform: rotate(315deg)
</style>