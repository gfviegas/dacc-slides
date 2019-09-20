<template lang="pug">
header
  img.logo-ufv(src="~@/assets/logos/ufv.png", alt="logo ufv")
  h1 Dia do Alumni da Ciência da Computação - UFV Florestal
  img.logo-dacc(src="~@/assets/logos/dacc-3.png", alt="logo")
</template>

<script>
export default {
  name: 'custom-header'
}
</script>

<style lang="sass" scoped>
@import "~@/assets/variables.sass"
// $gradient-list: $pink,darken($pink, 5%),darken($orange, 10%)
$gradient-list: $pink,$orange

header
  display: flex
  width: 100%
  // background: darken($pink, 10%)
  justify-content: space-around
  background: rgb(150,0,37)
  background: linear-gradient(130deg, rgba(255,124,46,1) 0%, rgba(255,5,67,1) 50%, rgba(255,124,46,1) 100%)

  h1
    display: flex
    flex-direction: column
    justify-content: center
    font-size: 2rem
    color: white
    font-weight: bold
  img.logo-ufv
    align-self: center
    height: 5rem
    padding: 1rem 0
  img.logo-dacc
    align-self: center
    margin-left: 2rem
    height: 5rem
    padding: 0.2rem 0
</style>
