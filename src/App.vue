<template>
<div id="q-app">
    <q-layout view="lhr Lpr lFf">
    <app-header></app-header>
    <q-page-container>
      <transition :name="transitionName" mode="out-in">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" class="child-view"></router-view>
          </keep-alive>
      </transition>
        <transition :name="transitionName" mode="out-in">
            <router-view v-if="!$route.meta.keepAlive" class="child-view"></router-view>
        </transition>
    </q-page-container>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          color="deep-purple-6"
          size="md"
          round
          v-back-to-top.animate="{offset: 500, duration: 200}"
          class="animate-pop"
        >
          <q-icon name="keyboard_arrow_up" />
        </q-btn>
      </q-page-sticky>
      <!-- <app-footer></app-footer> -->
    <!-- <vue-particles
        color="#dedede"
        :particleOpacity="1"
        :particlesNumber="100"
        shapeType="polygon"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1.5"
        :lineLinked="true"
        :lineOpacity="0.8"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push">
    </vue-particles> -->
    </q-layout>
    </div>
</template>

<script>
import Header from './components/Header.vue'
// import Footer from './layouts/Footer.vue'

export default {
  name: 'App',
  // props: ['username'],
  components: {
    appHeader: Header
    // appFooter: Footer
  },
  data () {
    return {
      leftDrawerOpen: false,
      transitionName: 'slide-left'
    }
  },
  // created () {
  //   console.log(this.username)
  // },
  beforeRouteUpdate (to, from, next) {
  // if isBack = true，user click back，slide-right transition
    let isBack = this.$router.isBack
    if (isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    // set back
    this.$router.isBack = false
    next()
  }
}
</script>

<style>
body {
  height: 100%;
  width: 100%;
  background-color: white;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 16px;
  /* background: url('./assets/9210-1.jpg'); */
}
.child-view {
   position: absolute;
   width:100%;
   transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
   opacity: 0;
   -webkit-transform: translate(50px, 0);
   transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
   opacity: 0;
   -webkit-transform: translate(-50px, 0);
   transform: translate(-50px, 0);
}
/*
.fa-reddit {
  color: #9575cd;
}
.fa-graduation-cap{
  color: rgb(119, 83, 185)
}
.fa-republican {
  color: rgb(152, 90, 194)
}
#particles-js{
  height: 1000px;
  width: 100%
} */
</style>
