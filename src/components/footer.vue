<template lang="pug">
  #footer
    .copyright shyling
    .link
      a(href="https://github.com/lingmm", target="__blank")
        img(src="../assets/github-logo.png", alt="Github")
</template>

<style lang="stylus">
@import '../assets/variables'

#footer
  &
    margin-top 100px
    width 100%
    height: 96px
    background-color $primary_color
    display flex
    flex-flow row-reverse nowrap
    align-items center
    flex-wrap nowrap
    color rgba(255,255,255,.87)
    font-size 16px
  .link
    margin-left 5px
    margin-right 5px
    a
      vertical-align sub
  .copyright
    &
      margin-right 10%
    &::before
      font-family "Material Icons"
      content "\E86F"
      display inline-block
      vertical-align middle
      padding-left 5px
      padding-right 5px
  @media screen and (max-width: 900px)
    .copyright
      margin-right 0
    &
      justify-content center
</style>

<script>
export default {
  name: 'Footer'
};
</script>
