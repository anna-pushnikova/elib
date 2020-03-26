<template lang="pug">
  messageBoxBase(
    title=""
    @click="$emit('cancel')"
    @cancel="$emit('cancel')"
  ) 
    .ui-messageBox__content(
      slot="content"
    )
      p Delete Quote
      p Are you sure?

    .ui-messageBox__footer(
      slot="footer"
    )
      .button.button-light(
        @click="$emit('cancel')"
      ) Cancel
      .button.button-primary(
        @click="$emit('delete', {bookId, quoteId})"
      ) Delete
</template>

<script>
import messageBoxBase from './messageBox_base'

export default {
  components: {
    messageBoxBase
  },
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
      bookId: this.id
    }
  },
}
</script>

<style>

</style>