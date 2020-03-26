<template lang="pug">
  messageBoxBase(
    :title="title"
    @click="$emit('cancel')"
    @cancel="$emit('cancel')"
  )
    .ui-messageBox__content(
      slot="content"
    )
      p Title
      input(
        type="text"
        v-model='titleBook'
      )
      p Author
      input(
        type="text"
        v-model='authorBook'
      )
      p Description
      textarea(
        type="text"
        v-model='descriptionBook'
      )
    .ui-messageBox__footer(
      slot="footer"
    )
      .button.button-light(
        @click="$emit('cancel')"
      ) Cancel
      .button.button-primary(
        @click="$emit('finish', {idBook, titleBook, authorBook, descriptionBook})"
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
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      idBook: this.id,
      titleBook: this.title,
      authorBook: this.author,
      descriptionBook: this.description
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