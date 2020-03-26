<template lang="pug">
  .ui-card.ui-card--shadow
    .task-item__info
      img(
        src="../assets/right-quote.svg"
      )
      p.ui-text-regular {{this.q}}
      span.button-close(
        @click="$emit('delete')"
      )
    .task-item__content
      .task-item__header
      .task-item__body
      .task-item__footer
        .tag-list
          .button-list-wrapper
            .buttons-list
              .button.button--round.button-primary(
                @click="$emit('edit')"
              ) Edit
</template>

<script>
export default {
  props: {
    q: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="stylus">
.ui-card.ui-card--shadow
  margin-bottom 20px

img 
  width 100px
  height @width
</style>