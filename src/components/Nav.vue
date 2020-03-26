<template lang="pug">
  header
    .navbar
      .container
        .navbar-content
          router-link.header-logo(
            to="/"
          ) Book Lib
          .button-burger(
            @click="menuShow = !menuShow"
            :class="{ active: menuShow}"
          )
            span.line.line-1
            span.line.line-2
            span.line.line-3
          .navbar-list__wrapper(
            :class="{ active: menuShow}"
          )
            ul.navbar-list
              li.navbar-item(
                v-for="link in linkMenu"
                :key="link.title"
                :class="{ active: menuShow}"
                @click="menuShow = false"
              )
                router-link.navbar-link(
                  :to="`${link.url}`"
                ) {{link.title}}
              li.navbar-item(
                v-if="checkUser"
                @click="logout"
              )
                span.navbar-link Logout
</template>

<script>
export default {
  data: () => ({
    menuShow: false
  }),
  methods: {
    logout() {
      this.$store.dispatch('logoutUser')
        .then(() => {
          this.$store.commit('setSuccessMessage', 'You logged out!')
          this.$router.push('/login')
        })
        .catch(e => this.$store.commit('setErrorMessage', 'Something went wrong'))
      
    }
  },
  computed: {
    checkUser() {
      return this.$store.getters.checkUser
    },
    linkMenu() {
      if(this.checkUser) {
        return [
          {title: 'Home', url: '/'},
          {title: 'Books', url: '/books'}
        ]
      } else {
          return [
            {title: 'Login', url: '/login'},
            {title: 'Register', url: '/register'}
        ]
      }
      
    }
  }
}
</script>

<style>

</style>