<template lang="pug">
  transition(name="modal")
    .ui-messageBox__wrapper(
        @click="$emit('cancel')"
        @keypress.esc="$emit('cancel')"
      )
      .ui-messageBox(
          @click.stop=""
        )
        .ui-messageBox__header
          span.messageBox-title {{ title }}
          span.button-close(
            @click="$emit('cancel')"
          )
        slot(name="content")
          span Content
        slot(name="footer")
          .button.button-light(
            @click="$emit('cancel')"
          ) Cancel
          .button.button-primary(
            @click="$emit('ok')"
          ) OK
</template>

<script>
export default {
  name: 'messageBoxBase',
  props: {
    title: {
      type: String,
      required: false
    }
  },
  mounted () {
    document.body.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.$emit('cancel')
      }
    })
  }
}
</script>

<style lang="stylus">
.ui-messageBox__content 
  display flex
  flex-direction column
  align-items center

</style>