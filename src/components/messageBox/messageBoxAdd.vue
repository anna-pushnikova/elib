<template lang="pug">
  messageBoxBase(
    title=""
    @click="$emit('cancel')"
    @cancel="$emit('cancel')"
  )
    .ui-messageBox__content(
      slot="content"
    )
      div.title Add Quote

      textarea(
        type="text"
        v-model="quoteBody"
      )
      
    .ui-messageBox__footer(
      slot="footer"
    )
      .button.button-light(
        @click="$emit('cancel')"
      ) Cancel
      .button.button-primary(
        @click="$emit('add', {quoteBody, idBook})"
      ) OK
</template>

<script>
import messageBoxBase from './messageBox_base'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      idBook: this.id,
      titleBook: this.title,
      authorBook: this.author,
      quoteBody: ''
    }
  },
  components: {
    messageBoxBase
  }
}
</script>

<style lang="stylus">
.title 
  margin-bottom 20px
</style>