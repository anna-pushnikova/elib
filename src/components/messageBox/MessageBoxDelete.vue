<template lang="pug">
  messageBoxBase(
    :title="title"
    @click="$emit('cancel')"
    @cancel="$emit('cancel')"
  ) 
    .ui-messageBox__content(
      slot="content"
    )
      p Delete - {{ title }}
      p Are you sure?

    .ui-messageBox__footer(
      slot="footer"
    )
      .button.button-light(
        @click="$emit('cancel')"
      ) Cancel
      .button.button-primary(
        @click="$emit('delete', id)"
      ) Delete
</template>

<script>
import messageBoxBase from './messageBox_base'

export default {
  components: {
    messageBoxBase
  },
  props: {
    // TODO obj
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>