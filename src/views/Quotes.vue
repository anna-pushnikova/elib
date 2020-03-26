<template lang="pug">
  div.quote-container
    span.quotes-title.ui-label.ui-label--primary {{authorEditing}} 
    .ui-title-4  {{titleEditing}}
    .no-quotes-container(
      v-if="!quotes.length"
    ) No quotes regarding to {{titleEditing}}. Add a quote!
    transition-group(
      name="taskList"
      v-else
    )  
      Quote(
        v-for="q in quotes"
        :key="q.id"
        :q="q.quoteContent"
        @delete="deleteQuote(q.id, bookId)"
        @edit="editQuote(q.id, bookId, q.quoteContent)"
      )
    plusButton(
      @add="newQuote = !newQuote"
    )
    messageBoxAdd(
      v-if="newQuote"
      :id="bookId"
      :class="{ active: newQuote }"
      @cancel="cancelQuoteAdding"
      @add="finishQuoteAdding"
    )

    messageBoxEditQuote(
      v-if="editingQuote"
      :id="bookId"
      :quoteId="quoteId"
      :class="{ active: editingQuote }"
      @cancel="cancelQuoteEdit"
      @edit="finishEditQuote"
    )

    messageBoxDeleteQuote(
      v-if="deletingQuote"
      :id="bookId"
      :quoteId="quoteId"
      :class="{ active: deletingQuote }"
      @cancel="cancelQuoteDelete"
      @delete="finishDeleteQuote"
    )

</template>

<script>
import Quote from '@/components/Quote.vue'
import plusButton from '@/components/floatingButton.vue'
import messageBoxAdd from '@/components/messageBox/messageBoxAdd'
import messageBoxEditQuote from '../components/messageBox/MessageBoxEditQuote'
import messageBoxDeleteQuote from '../components/messageBox/MessageBoxDeleteQuote'

export default {
  components: {
    Quote,
    plusButton,
    messageBoxAdd,
    messageBoxEditQuote,
    messageBoxDeleteQuote
  },
  mounted() {
    this.$store.dispatch('loadBookQuotes', this.id)
      .then(() => {
        this.quotes = this.$store.getters.getQuotes
      })
      .catch(e=> 'Somth went wrong')
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      bookId: this.$route.query.id,
      titleEditing: this.$route.query.title,
      authorEditing: this.$route.query.author,
      loadedQuotes: [],
      editingQuote: false,
      deletingQuote: false,
      newQuote: false,
      quotes: [],
      quoteId: '',
      quoteContent: ''
    }
  },
  methods: {
    finishQuoteAdding({ quoteBody, idBook }) {
      const data = {
        idBook,
        quoteBody
      }
      this.$store.dispatch('addBookQuote', data)
        .then(() => {
          this.newQuote = false
          this.$store.commit('setSuccessMessage', 'Quote was edited!')
          this.$store.dispatch('loadBookQuotes', this.id)
            .then(() => {
              this.quotes = this.$store.getters.getQuotes
            })
            .catch(e=> 'Somth went wrong')
            })
        .catch((e) => {
          this.$store.commit('setErrorMessage', e.message)
        })
    },
    cancelQuoteAdding() {
      this.newQuote = !this.newQuote
    },
    deleteQuote(quoteId, bookId) {
      this.quoteId = quoteId
      this.bookId = bookId
      this.deletingQuote = !this.deletingQuote

    },
    finishDeleteQuote({quoteId, bookId}) {
      const data = {
        quoteId,
        bookId
      }
      this.$store.dispatch('deleteQuote', data)
        .then(() => {
          this.$store.commit('setSuccessMessage', 'Quote was deleted!')
          this.$store.dispatch('loadBookQuotes', this.id)
            .then(() => {
              this.quotes = this.$store.getters.getQuotes
            })
            .catch(e=> 'Somth went wrong')
            })
        .catch(e => 'Somth went wrong')
      this.deletingQuote = false
    },
    editQuote(id, bookId, quoteContent) {
      this.quoteId = id 
      this.bookId = bookId
      this.quoteContent = quoteContent

      this.editingQuote = !this.editingQuotes
    },
    finishEditQuote({quoteId, bookId, quoteContent}) {
      const data = {
        quoteId,
        bookId,
        quoteContent
      }
      this.$store.dispatch('editQuote', data)
        .then(() => {
          this.$store.commit('setSuccessMessage', 'Quote was edited!')
          this.$store.dispatch('loadBookQuotes', this.id)
            .then(() => {
              this.quotes = this.$store.getters.getQuotes
            })
            .catch(e=> 'Somth went wrong')
            })
        .catch(e => 'Somth went wrong')
      this.editingQuote = !this.editingQuote
    },
    cancelQuoteEdit() {
      this.editingQuote = !this.editingQuote
    },
    cancelQuoteDelete() {
      this.deletingQuote = !this.deletingQuote
    }
  }
}
</script>

<style lang="stylus">
.quote-container
  position relative
  margin-top 50px
  margin-bottom 100px

.no-quotes-container
  text-align center

.quotes-title
  font-size 24px

.ui-title-4
  padding-top 15px
  margin-bottom 20px !important
</style>