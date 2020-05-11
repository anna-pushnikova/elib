<template lang="pug">
  .content-wrapper
    section 
      .container
        .auth
          .auth__banner
            img(
              src="@/assets/login.jpg"
            )
          .auth__form
            span.ui-title-2 Login
            form(
              @submit.prevent="onSubmit"
            )
              .form-item(
                :class="{ 'errorInput': $v.email.$error }"
              )
                input(
                  type="text"
                  placeholder="Email"
                  v-model="email"
                  :class="{ 'error': $v.email.$error }"
                  @change="$v.email.$touch()"
                )
                .error(
                  v-if="!$v.email.required"
                ) Email is required
                .error(
                  v-if="!$v.email.email"
                ) Email is not correct

              .form-item(
                :class="{ 'errorInput': $v.password.$error }"
              )
                input(
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  :class="{ 'error': $v.password.$error }"
                  @change="$v.password.$touch()"
                )
                .error(
                  v-if="!$v.password.required"
                ) Password is required

              .buttons-list
                button.button.button-primary(
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                ) 
                  span(v-if="loading") Loading...
                  span(v-else) Login

              .buttons-list.buttons-list--info
                p(v-if="submitStatus === 'OK'") Thanks for your submission!
                p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                p(v-else) {{submitStatus}}
              .buttons-list.buttons-list--info
                span Do not have account? 
                  router-link(
                    to="/register"
                  )  Click here
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    submitStatus: null
  }),
  validations: {
    email: { email, required },
    password: { required }
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if(this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('login', user)
          .then(() => {
            this.submitStatus = 'OK'
            this.$store.commit('setSuccessMessage', 'You logged in!')
            this.$router.push('/')
          })
          .catch((e) => {
            this.submitStatus = e.message
            
          })
      }
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus">
.auth 
  display flex
  align-items center
  flex-wrap wrap

.auth__banner,
.auth__form
  width 50%
  img 
    width 70%
  @media screen and (max-width 768px)
    width: 100%
    margin-bottom 30px
    &:last-child
      margin-bottom 0

.form-item 
  .error
    display none
    margin-bottom 8px
    font-size 13.4px
    color #fc5c65
  &.errorInput
    .error
      display block

input 
  &.error
    border-color #fc5c65
    animation shake .3s

.buttons-list
  text-align right
  margin-bottom 20px
  &.buttons-list--info
    text-align center
    &:last-child
      margin-bottom 0

a 
  color #444ce0

</style>
