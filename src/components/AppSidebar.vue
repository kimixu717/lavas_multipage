<template>
  <aside class="js-side-nav side-nav">
    <nav class="js-side-nav-container side-nav__container">
      <button class="js-menu-hide side-nav__hide material-icons">close</button>
      <header class="side-nav__header">
        Side Nav
      </header>
      <ul class="side-nav__content">
        <li @click="hideSideNav">
          <router-link to="/detail/1">detail 1</router-link>
        </li>
        <li @click="hideSideNav">
          <router-link to="/detail/2">detail 2</router-link>
        </li>
        <li @click="hideSideNav">
          <router-link to="/detail/3">detail 3</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
  import EventBus from '../event-bus'

  class Detabinator {
    constructor(element) {
      if (!element) {
        throw new Error('Missing required argument. new Detabinator needs an element reference')
      }
      this._inert = false
      this._focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]'
      this._focusableElements = Array.from(
        element.querySelectorAll(this._focusableElementsString)
      )
    }

    get inert() {
      return this._inert
    }

    set inert(isInert) {
      if (this._inert === isInert) {
        return
      }

      this._inert = isInert

      this._focusableElements.forEach((child) => {
        if (isInert) {
          // If the child has an explict tabindex save it
          if (child.hasAttribute('tabindex')) {
            child.__savedTabindex = child.tabIndex
          }
          // Set ALL focusable children to tabindex -1
          child.setAttribute('tabindex', -1)
        } else {
          // If the child has a saved tabindex, restore it
          // Because the value could be 0, explicitly check that it's not false
          if (child.__savedTabindex === 0 || child.__savedTabindex) {
            return child.setAttribute('tabindex', child.__savedTabindex)
          } else {
            // Remove tabindex from ANY REMAINING children
            child.removeAttribute('tabindex')
          }
        }
      })
    }
  }

  export default {
    name: 'appSidebar',
    data() {
      return {
        startX: 0,
        currentX: 0,
        touchingSideNav: false,
        supportsPassive: undefined,
        showButtonEl: null,
        hideButtonEl: null,
        sideNavEl: null,
        sideNavContainerEl: null,
        detabinator: null
      }
    },
    created() {
      EventBus.$on('app-header:click-menu', () => {
        this.showSideNav()
      })
    },
    mounted() {
      this.showButtonEl = document.querySelector('.showMenu')
      this.hideButtonEl = document.querySelector('.js-menu-hide')
      this.sideNavEl = document.querySelector('.js-side-nav')
      this.sideNavContainerEl = document.querySelector('.js-side-nav-container')
      this.detabinator = new Detabinator(this.sideNavContainerEl)
      this.detabinator.inert = true

      // this.showButtonEl.addEventListener('click', this.showSideNav)
      this.hideButtonEl.addEventListener('click', this.hideSideNav)
      this.sideNavEl.addEventListener('click', this.hideSideNav)
      this.sideNavContainerEl.addEventListener('click', this.blockClicks)

      this.sideNavEl.addEventListener('touchstart', this.onTouchStart, this.applyPassive())
      this.sideNavEl.addEventListener('touchmove', this.onTouchMove, this.applyPassive())
      this.sideNavEl.addEventListener('touchend', this.onTouchEnd)
    },
    methods: {
      applyPassive () {
        if (this.supportsPassive !== undefined) {
          return this.supportsPassive ? {passive: true} : false
        }
        // feature detect
        let isSupported = false
        try {
          document.addEventListener('test', null, {get passive () {
            isSupported = true
          }})
        } catch (e) {
          throw new Error('apply passive error')
        }
        this.supportsPassive = isSupported
        return this.applyPassive()
      },
      onTouchStart (evt) {
        if (!this.sideNavEl.classList.contains('side-nav--visible'))
          return

        this.startX = evt.touches[0].pageX
        this.currentX = this.startX

        this.touchingSideNav = true
        requestAnimationFrame(this.update)
      },
      onTouchMove (evt) {
        if (!this.touchingSideNav)
          return

        this.currentX = evt.touches[0].pageX
      },
      onTouchEnd (evt) {
        if (!this.touchingSideNav)
          return

        this.touchingSideNav = false

        const translateX = Math.min(0, this.currentX - this.startX)
        this.sideNavContainerEl.style.transform = ''

        if (translateX < 0) {
          this.hideSideNav()
        }
      },
      update () {
        if (!this.touchingSideNav)
          return

        requestAnimationFrame(this.update)

        const translateX = Math.min(0, this.currentX - this.startX)
        this.sideNavContainerEl.style.transform = `translateX(${translateX}px)`
      },
      blockClicks (evt) {
        evt.stopPropagation()
      },
      onTransitionEnd (evt) {
        this.sideNavEl.classList.remove('side-nav--animatable')
        this.sideNavEl.removeEventListener('transitionend', this.onTransitionEnd)
      },
      showSideNav () {
        this.sideNavEl.classList.add('side-nav--animatable')
        this.sideNavEl.classList.add('side-nav--visible')
        this.detabinator.inert = false
        this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd)
      },
      hideSideNav () {
        this.sideNavEl.classList.add('side-nav--animatable')
        this.sideNavEl.classList.remove('side-nav--visible')
        this.detabinator.inert = true
        this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .side-nav
    position fixed
    left 0
    top 0
    z-index $app-sidebar-zindex
    width 100%
    height 100%
    overflow hidden
    pointer-events none
    &::before
      content ''
      display block
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      background rgba(0,0,0,0.4)
      opacity 0
      will-change opacity
      transition opacity 0.3s cubic-bezier(0,0,0.3,1)

  .side-nav--visible
    pointer-events auto
    &.side-nav--animatable
      .side-nav__container
        transition transform 0.33s cubic-bezier(0,0,0.3,1)
    &::before
      opacity 1
    .side-nav__container
      transform none

  .side-nav__container
    position relative
    width 90%
    max-width 400px
    background #FFF
    height 100%
    box-shadow 2px 0 12px rgba(0,0,0,0.4)
    transform translateX(-102%)
    display flex
    flex-direction column
    will-change transform

  .side-nav--animatable
    .side-nav__container
      transition transform 0.13s cubic-bezier(0,0,0.3,1)

  .side-nav__hide
    position absolute
    left 16px
    top 16px
    z-index $app-sidebar-zindex
    background none
    border none
    color #FFF
    width 24px
    height 24px
    padding 0
    margin 0

  .side-nav__header
    height 200px
    background #EA2663
    color #FFF
    display flex
    padding 16px
    align-items flex-end
    font-size 24px

  .side-nav__content
    flex 1
    list-style none
    padding 0
    margin 0
    text-align left
    overflow-x hidden
    overflow-y auto
    -webkit-overflow-scrolling touch
    li
      height 48px
      line-height 48px
      padding 0 16px
      &:hover
        background #CCC
</style>
