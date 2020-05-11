<template lang="pug">
  .content-wrapper
    section 
      .container
        .form-container
          h1.ui-title-1 Home
          form(@submit.prevent="onSubmit")
            .form-item(:class="{ errorInput: $v.bookTitle.$error }")
              input(
                type="text"
                placeholder="What will we read?"
                v-model="bookTitle"
                @change="$v.bookTitle.$touch()"
                :class="{ error: $v.bookTitle.$error }"
              )
              .error(v-if="!$v.bookTitle.required") Title is required.
            .form-item
              input(
                type="text"
                placeholder="Who is the author?"
                v-model="bookAuthor"
              )
            .form-item
              textarea(
                type="text"
                v-model="bookDescription"
                @keyup.enter="onSubmit"
              )
          
          .tag-list.tag-list--add
            .ui-tag__wrapper(
              @click="tagMenuShow = !tagMenuShow"
            )
              .ui-tag
                span.tag-title Add New
                span.button-close(
                  :class="{ active: !tagMenuShow }"
                )
          .tag-list(
              v-if="tagMenuShow"
            )
            .tag-list--menu
              input.tag-add--input(
                type="text"
                placeholder="New tag"
                v-model="tagTitle"
                @keup.enter="newTag"
              )
              .button.button-default(
                @click="newTag"
              ) Send
          .tag-list
            transition-group(
              enter-active-class="animated fadeInRight"
              leave-active-class="animated fadeOutDown"
            )
              .ui-tag__wrapper(
                v-for="tag in tags"
                :key="tag.title"
              )
                .ui-tag(
                  @click="addTagUsed(tag)"
                  :class="{ used: tag.use}"
                )
                  span.tag-title {{tag.title}}
                  span.button-close(
                    @click="deleteTag(tag.id)"
                  )

          .button-list
            .button.button--round.button-primary(
              @click="onSubmit"
            ) Send

        img(
          src="@/assets/home.png"
        )
</template>


<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Home',
  data() {
    return {
      bookTitle: '',
      bookDescription: '',
      tagsUsed: [],
      tagTitle: '',
      tagMenuShow: false,
      bookAuthor: ''
    }
  },
  validations: {
    bookTitle: {
      required
    }
  },
  methods: {
    newTag() {
      if(this.tagTitle === '') {
        return
      }
      const tag = {
        title: this.tagTitle,
        use: false
      }
      this.$store.dispatch('newTag', tag)
        .then(() => {
          this.$store.commit('setSuccessMessage', 'New tag was added!')
        })
        .catch(e => this.$store.commit('setErrorMessage', e.message))
        
      this.$store.dispatch('loadTags')
      .then(() => {})
      .catch(e => this.$store.commit('setErrorMessage', 'Something went wrong...'))

      //Reset Field
      this.tagTitle = ''

    },
    onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        this.submitStatus = 'ERROR'
        return
      }


      if(this.bookAuthor === '') {
        this.bookAuthor = 'No Author'
      }

      const book = {
        title: this.bookTitle,
        author: this.bookAuthor, 
        description: this.bookDescription,
        tags: this.tagsUsed,
        completed: false,
        editing: false
      }

      this.$store.dispatch('newBook', book) 
        .then(() => {
          this.submitStatus = 'OK'
          this.$store.commit('setSuccessMessage', 'New book was added!')
        })
        .catch(e => this.$store.commit('setErrorMessage', 'Something went wrong...'))
    
      // Reset fields
      this.bookTitle = ''
      this.bookDescription = ''
      this.bookAuthor = ''
      this.$v.$reset()

      this.tagsUsed = []
      this.tagMenuShow = false
      this.tagTitle = ''
      
      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].use = false
      }

    },
    addTagUsed(tag) {
      tag.use = !tag.use
      if(tag.use) {
        this.tagsUsed.push({
          title: tag.title
        })
      } else {
        this.tagsUsed.splice(tag.title, 1)
      }
    },
    deleteTag(id) {
    this.$store.dispatch('deleteTag', id)
      .then(() => {
        this.$store.commit('setSuccessMessage', 'Tag was deleted!')
        this.$store.dispatch('loadTags')
      })
      .catch(e => this.$store.commit('setErrorMessage', 'Something went wrong...')) 
    },
  },
  computed: {
    tags () {
      return this.$store.getters.tags
    }  
  },
  mounted() { 
    this.$store.dispatch('loadTags')
      .then(() => {})
      .catch(e => this.$store.commit('setErrorMessage', 'Something went wrong...'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.container
  display flex
  flex-wrap nowrap
  flex-direction row
  justify-content space-around
  align-items center
  img 
    width 40%

.form-container 
  width 450px
  height 502px

.tag-list 
  margin-bottom 20px
.ui-tag__wrapper
  margin-right 18px
  margin-bottom 10px
  &:last-child
    margin-right 0

.ui-tag
  .button-close
    width 20px
    height @width
    &:before,
    &:after
      background-color #000
    &.active
      transform: rotate(45deg)
  &.used
    background-color #444ce0
    color #fff
    .button-close
      &:before,
      &:after
        background-color #000

.form-item 
  margin-bottom 20px
  input
    margin-bottom 0
  .error
    margin-top 5px
    font-size 14px
  
.tag-list
  .error
    margin-top 5px
    font-size 14px

.tag-list--menu
  display flex
  justify-content space-between
  align-items center
  input
    margin-bottom 0

.tag-add--input
  margin-bottom 0
  margin-right 10px
  height 42px

.button-list
  display flex
  justify-content flex-end
  .button-primary:focus
    background-color #444ce0

</style>
