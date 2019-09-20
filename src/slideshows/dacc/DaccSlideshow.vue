<template lang='pug'>
#secom-slides.eg-theme-agrume
  .eg-slideshow
    //- Avisos Gerais
    //- slide(enter='fadeIn' leave='fadeOut')
    //-   h2.slide-title Avisos
    //-   ul.warnings
    //-     li Lembrem-se de levar o crachá e o copo para os coffee-breaks!
    //-     li É feito credenciamento ao fim de cada coffe-break.
    //-     li Aproveitem a balbúrdia.

    //- Patrocinadores
    slide(enter='bounceInRight', :steps="supporters.length || 0")
      h2.slide-title Apoio
      center.center
        eg-transition(enter='bounceInLeft' v-for="(s, index) in supporters")
          .supporter(v-if="step == index + 1")
            img(:src="s.logo")
            h5 {{s.title}}

    //- Próximos Eventos
    slide(enter='bounceInRight', leave='fadeOut')
      h2.slide-title Em seguida...
      ul.up-next
        li(v-for="e in nextEvents").schedule-item
          strong {{e.what}}
          p.tabbed
            em {{e.where}}
            span &nbsp;- {{e.when.format('[às] HH:mm[h]')}}
</template>
<script>
import axios from 'axios'
import eagle from 'eagle.js'
import supporters from '@/data/supporters'
import schedule from '@/data/schedule'
import StarRating from 'vue-star-rating'

const ENDPOINT = 'https://secom.gfviegas.com/scapeteste/mymobiconfweb/App/fetchSECOMSlides.php?evento=245'
const SECONDS = 4

export default {
  components: { StarRating },
  mixins: [ eagle.slideshow ],
  infos: {
    title: 'SECOM Slideshow',
    description: 'Slides pra o evento da SECOM',
    path: ''
  },
  props: {
    repeat: true,
    keyboardNavigation: true,
    mouseNavigation: false
  },
  data () {
    return {
      supporters,
      intervalHandler: null,
      stats: null,
      schedule: null
    }
  },
  methods: {
    calculateStar (x) {
      return 5 - Math.abs((x - 3) * Math.ceil(5 / 3))
    },
    async handleNextStep () {
      const slidesStepQuantum = [0, 2, 2, 3]

      await this.nextStep()
      const nextTimeout = SECONDS * slidesStepQuantum[this.currentSlideIndex] * 1000
      if (this.currentSlideIndex === 5) {
        this.fetchEventData()
        this.mapSchedule()
      }

      this.intervalHandler = setTimeout(this.handleNextStep, nextTimeout)
    },
    async fetchEventData () {
      try {
        const { data } = await axios.get(ENDPOINT)
        this.stats = data
      } catch (e) {
      }
    },
    async mapSchedule () {
      this.schedule = schedule
        .map(s => {
          return {
            what: s.what,
            when: this.$moment(s.when, 'DD/MM/YYYY HH:mm'),
            where: s.where
          }
        })
        .filter(s => s.when.isAfter())
        .sort((a, b) => a.when.valueOf() - b.when.valueOf())
    }
  },
  computed: {
    // Pega os proximos 3 eventos
    nextEvents () {
      return this.schedule.slice(0, 3)
    }
  },
  async created () {
    this.fetchEventData()
    this.mapSchedule()
    this.intervalHandler = setTimeout(this.handleNextStep, 3 * SECONDS * 1000)

    // Preload de imagens
    await this.$imagePreload(supporters.map(s => s.logo))
  },
  beforeDestroy () {
    clearTimeout(this.intervalHandler)
  }
}
</script>

<style lang='sass'>
@import "~@/assets/variables.sass"
@import "node_modules/eagle.js/dist/themes/agrume/agrume"

@mixin gradient-text($angle: 45deg, $color: $pink, $amount: 45%)
  color: $color
  background: -webkit-linear-gradient($angle, $color, adjust-hue($color, $amount))
  -webkit-text-fill-color: transparent
  -webkit-background-clip: text
  display: inline-block

#secom-slides
  .eg-slideshow
    font-family: 'Barlow', sans-serif
    background-image: none !important
    background-color: white
    color: $pink
    height: 80vh!important
    .eg-slide
      height: 80vh!important
      .eg-slide-content
        width: 80%
        margin: 0 auto
        display: flex
        height: 100%
        flex-direction: column
        justify-content: space-around

        ul.up-next
          p.tabbed
            color: $brown

        ul.warnings
          height: 100%
          display: flex
          justify-content: space-between
          flex-direction: column
          li
            font-size: 3rem
            @media (min-width: 1600px)
              font-size: 5rem
            font-weight: bold
            padding-bottom: 3rem

        h2.slide-title
          @media (max-width: 1600px)
            font-size: 4rem
          // font-size: 6rem
          font-family: 'Barlow', sans-serif
          text-align: left
          margin: 1rem
          font-weight: bold
          @include gradient-text($angle: 25deg, $amount: 90%)

        .supporter
          img
            max-height: 30rem
            @media (min-width: 1600px)
              max-height: 30rem
          h5
            color: $brown
        .schedule-item
          font-size: 2rem
          @media (min-width: 1600px)
            font-size: 3rem
          p
            margin-top: 0
          &:not(:last-child)
            padding-bottom: 1rem
          .tabbed
            padding-left: 2rem
</style>
