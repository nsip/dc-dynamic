<template>
    <div class="header">
    <q-layout-header reveal @scroll="handleSCroll">
      <q-toolbar
        color="white"
        :inverted="$q.theme === 'mat' & 'ios'"
      >
      <q-toolbar-title>
          <a href="/" style="color:white; text-decoration-line: none">
           <img src="../assets/daybook-icon.png">
          </a>
          <div slot="subtitle"></div>
      </q-toolbar-title>
        <!-- <q-btn
          flat
          dense
          round
          color="deep-purple-7"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          <a href="/" style="color:white; text-decoration-line: none">
           <img src="../assets/digital-classroom-copy.png">
          </a>
          <div slot="subtitle"></div>
        </q-toolbar-title>
        <div v-if="auth">
                <q-btn
                  flat
                  color="purple-14"
                  size="md"
                  rounded
                  class="log-btn"
                  @click="$router.push({ name: 'dashboard', params: { username: user.name } })">
                  <img src="../assets/crown.png">
                  <p>My Dashboard</p>
                </q-btn>
            <q-btn
                outline
                color="purple-14"
                size="md"
                rounded
                class="log-btn"
                @click="logout" >
                  <img src="../assets/logout.png">
                  <p>Logout</p>
            </q-btn>
        </div>
        <div v-else>
          <q-btn
            class="q-ma-sm log-btn"
            flat
            rounded
            color="purple-14"
            @click="$router.push('/auth/register')">
            <img src="../assets/register-2.png">
            <p>Register</p>
          </q-btn>
        <q-btn
            class="q-ma-sm log-btn"
            outline
            rounded
            color="purple-14"
            @click="$router.push('/auth/login')">
            <img src="../assets/login-2.png">
            <p>Login</p>
        </q-btn>
        </div> -->
      </q-toolbar>
    </q-layout-header>
    </div>
</template>

<script>
// import Entry from '../components/Entry.vue'
export default {
  name: 'MyLayout',
  props: ['username'],
  // components: {
  //   appEntry: Entry
  // },
  data () {
    return {
      leftDrawerOpen: false,
      miniState: false,
      transitionName: 'slide-left'
      // localuser: undefined
    }
  },
  // created () {
  //   this.localuser = this.$store.state.user.user
  //   console.log(this.localuser)
  //   console.log(this.username)
  // },
  computed: {
    auth () {
      return this.$store.state.user.auth
    },
    user () {
      return this.$store.state.user.user
    }
  },
  methods: {
    logout () {
      this.$q.dialog({
        title: 'Comfirm',
        message: 'Are you sure to log out?',
        color: 'deep-purple-6',
        ok: true,
        cancel: true
      }).then(() => {
        this.$store.dispatch('user/logout')
      }).catch(() => {})
    },
    handleSCroll (event) {
      let header = document.querySelector('.q-layout-header')
      if (window.scrollY > 100 && !header.className.includes('act')) {
        header.classList.add('act')
      } else if (window.scrollY < 100) {
        header.classList.remove('act')
      }
    }
  },
  watch: {
    mask () {
      if (this.leftDrawerOpen === true) {
        console.log('mask')
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.handleSCroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleSCroll)
  },
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
  // methods: {
  //   openURL
  // }
}
</script>
<style scoped>
.q-btn {
  margin-right: 5px;
}
</style>
