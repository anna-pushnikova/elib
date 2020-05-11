<template lang="pug">
div
  .ui-card.ui-card--shadow
    .task-item__info
      .task-item__main-info
        span.ui-label(
          :class="[{ 'ui-label--primary': !book.completed }, { 'ui-label--light': book.completed  }]"
        ) {{ book.author }}
      span.button-close(
        @click="$emit('delete')"
      )
    .task-item__content
      .task-item__header
        .ui-checkbox-wrapper
          input.ui-checkbox(
            type="checkbox"
            v-model="book.completed"
            @click="$emit('completed')"
          )
        span.ui-title-3 {{book.title}}
      .task-item__body
        p.ui-text-regular {{book.description}}
      .task-item__footer
        .tag-list
          .ui-tag__wrapper(
            v-for="tag in book.tags"
            :key="tag.title"
          )
            .ui-tag
              span.tag-title {{tag.title}}
          .button-list-wrapper
            .buttons-list
              router-link(
                class="button button--round button-light"
                tag="a"
                :to="{ name: 'quotes', params: { id: book.id }, query: { id: book.id, title: book.title, author: book.author } }"
                :id="book.id"
              ) #quotes
            .buttons-list
              .button.button--round.button-default(
                @click="$emit('edit')"
              ) Edit
              .button.button--round.button-primary(
                @click="$emit('completed')"
              ) 
                span(v-if="!book.completed") Done
                span(v-else) Return
</template>

<script>
export default {
  name: 'Book',
  props: {
    book: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus">
.task-item
  margin-bottom 20px
  .ui-checkbox:checked:before
    border-color #909399
  &.completed
    .ui-title-2,
    .ui-text-regular,
    .ui-tag
      text-decoration line-through
      color #909399
  &:last-child
    margin-bottom 0
.ui-tag__wrapper
  margin-right 16px
// Info
.task-item__info
  display flex
  align-items center
  justify-content space-between
  margin-bottom 20px
  .button-close
    width 20px
    height @width
    &:before,
    &:after
      background-color #000
  .ui-label
    margin-right 8px
// Header
.task-item__header
  display flex
  align-items center
  margin-bottom 18px
  .ui-checkbox-wrapper
    margin-right 8px
  .ui-title-3
    margin-bottom 6px

  
// Body
.task-item__body
  margin-bottom 20px
// Footer
.tag-list
  margin-bottom 20px
.task-item__footer
  .buttons-list
    text-align right
// ALL buttons
.button-list-wrapper
  margin-top 15px
  display flex 
  justify-content space-between

  .buttons-list
    
    .button-light
      margin-right 12px
      color: #fff
      &:last-child
        margin-right 0
</style>