<template lang="pug">
  messageBoxBase(
    title="Edit Quote"
    @click="$emit('cancel')"
    @cancel="$emit('cancel')"
  )
    .ui-messageBox__content(
      slot="content"
    )
      
      textarea(
        type="text"
        v-model='quoteContent'
      )
    .ui-messageBox__footer(
      slot="footer"
    )
      .button.button-light(
        @click="$emit('cancel')"
      ) Cancel
      .button.button-primary(
        @click="$emit('edit', {quoteId, bookId, quoteContent})"
      ) OK
</template>

<script>
import messageBoxBase from './messageBox_base'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    quoteId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      quoteContent: '',
      bookId: this.id
    }
  },
  components: {
    messageBoxBase
  }
}
</script>

<style lang="stylus">
.ui-messageBox__wrapper
  &.active
    display flex
  .button-light
    margin-right 8px
</style>