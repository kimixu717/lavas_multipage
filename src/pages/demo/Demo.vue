<template>
  <div>
    <h2>Demo</h2>
    <router-link to="/demo/user">to user</router-link>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'home',
    props: {},
    methods: {
      ...mapActions('appShell/appHeader', [
        'setAppHeader'
      ])
    },
    async asyncData() {
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 500)
      })
    },
    activated() {
      this.setAppHeader({
        show: true,
        title: 'Demo',
        showMenu: true,
        showBack: false
      })
    }
  }
</script>

<style lang="stylus" scoped>
  $text-color := rgba($material-theme.text-color, $material-theme.primary-text-percent)

  h2
    margin-top 50%
    font-size 46px
    font-weight 500

  h2, h4
    color $text-color
</style>
