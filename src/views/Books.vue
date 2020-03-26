<template lang="pug">
  .content-wrapper
    section 
      .container
        .task-list__header
          h1.ui-title-1 Books
          .buttons-list
            .button.button--round.button-default(
              @click="filter = 'active'"
            ) Active
            .button.button--round.button-default(
              @click="filter = 'completed'"
            ) Completed
            .button.button--round.button-default(
              @click="filter = 'all'"
            ) All

        .task-list
        .error(v-if="this.$store.getters.books === null") You Haven't Added Books Yet
        transition-group(
          name="taskList"
          v-else
        )  
          Book(
            class="task-item"
            v-for="book in booksFilter"
            :book="book"
            :key="book.id"
            :class="{ completed: book.completed }"
            @delete="deleteBook(book.id, book.title)"
            @edit="bookEdit(book.id, book.title, book.author, book.description)"
            @completed="bookCompleted(book.id, book.completed)"
          )

    messageBoxEdit(
      v-if="editingPopup"
      :id="bookId"
      :title="titleEditing"
      :author="authorEditing"
      :description="descEditing"
      :class="{ active: editingPopup }"
      @cancel="cancelBookEdit"
      @finish="finishBookEdit"
    )

    messageBoxDelete(
      v-if="deletePopup"
      :id="bookId"
      :title="titleEditing"
      :class="{ active: deletePopup }"
      @cancel="cancelDelete"
      @delete="completeDelete"
    )


</template>

<script>
import Book from '@/components/Book.vue'
import messageBoxEdit from '@/components/messageBox/MessageBoxEdit.vue'
import messageBoxDelete from '@/components/messageBox/MessageBoxDelete'

export default {
  name: 'Books',
  data: () => ({
    filter: 'active',
    editingPopup: false,
    deletePopup: false,
    titleEditing: '',
    authorEditing: '',
    descEditing: '',
    bookId: null
  }),
  components: {
    Book,
    messageBoxEdit,
    messageBoxDelete
  },
  computed: {
    booksFilter() {
      if (this.filter === 'active') {
        return this.$store.getters.booksNotCompleted
      } else if (this.filter === 'completed') {
        return this.$store.getters.booksCompleted
      } else if (this.filter === 'all') {
        return this.$store.getters.books
      }
      return this.filter === 'active'
    },
    loading () {
      return this.$store.getters.loading
    }
    
  },
  methods: {
    bookEdit (id, title, author, description) {
      this.bookId = id,
      this.authorEditing = author,
      this.titleEditing = title
      this.descEditing = description

      this.editingPopup = !this.editingPopup
    },
    // Cancel button (POPUP)
    cancelBookEdit () {
      // Reset
      this.bookId = null,
      this.authorEditing = '',
      this.titleEditing = ''
      this.descEditing = ''

      this.editingPopup = !this.editingPopup
    },
    // Done button
    async finishBookEdit ({idBook, titleBook, authorBook, descriptionBook}) {
      let id = idBook
      let title = titleBook
      let author = authorBook
      let description = descriptionBook
      await this.$store.dispatch('editBook', {
        id,
        title,
        author,
        description
      })
        .then(() => {
          this.editingPopup = !this.editingPopup
          this.$store.commit('setSuccessMessage', 'Book was edited!')
        })
        .catch((e) => {
          this.$store.commit('setErrorMessage', 'Something went wrong...')
        })
      
    },
    // Delete button
    deleteBook (id, title) {
      this.deletePopup = !this.deletePopup
      this.bookId = id,
      this.titleEditing = title
    },
    cancelDelete() {
      this.deletePopup = !this.deletePopup
      // Reset
      this.bookId = null
      this.titleEditing = ''
      this.descEditing = ''
    },
    completeDelete(id) {
      this.$store.dispatch('deleteBook', id)
        .then(() => {
          this.$store.dispatch('loadBooks')
            .then(() => {
              this.deletePopup = !this.deletePopup
              this.$store.commit('setSuccessMessage', 'Book was deleted!')
            })
            .catch((e) => {
              this.$store.commit('setErrorMessage', 'Something went wrong...')
            })
        })
    },
    bookCompleted (id, completed) {
      completed ? completed = false : completed = true
      this.$store.dispatch('completedBook', {
        id,
        completed
      }).then(() => {
          this.$store.dispatch('loadBooks')
        })
        .catch((e) => {
          this.$store.commit('setErrorMessage', 'Something went wrong...')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.task-list__header
  display flex
  justify-content space-between
  align-items center
  margin-bottom 30px
  .button
    margin-right 8px
  .ui-title-1
    margin-bottom 0

.task-item
  margin-bottom 20px

.ui-messageBox__wrapper
  &.active
    display flex
  .button-light
    margin-right 8px

.button.button--round.button-default
  margin-right 10px
</style>
