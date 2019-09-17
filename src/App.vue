<template>
  <div v-if="isAuthResolved && isLocationResolved" id="app">
    <div class="page-wrapper">
      <BurgerNavbar></BurgerNavbar>
      <!-- <slider :width="300" format="overlay" direction="right" :opacity="0" class="burger-bars"></slider> -->
      <router-view :key="$route.path" />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from '@/components/shared/TheFooter'
import {mapGetters} from 'vuex'
import BurgerNavbar from '@/components/shared/BurgerNavbar'
//import Slider from '@/components/shared/Slider'

export default {
  name: 'app',
  components: {
    TheFooter,
    BurgerNavbar
    //'slider': Slider
  },
  computed: {
    isAuthResolved () {
      return this.$store.state.auth.isAuthResolved
    },
    isLocationResolved () {
      return this.$store.state.meta.isLocationResolved
    },
    ...mapGetters({
        'user': 'auth/authUser'
    })
  },
  methods: {
  logout () {
        this.$store.dispatch('auth/logout')
          .then(() => {
            this.$router.push('/')
          })
      }
  },
  created () {
    this.$store.dispatch('meta/fetchMetaData')
  },
}
</script>

<style lang="scss">
@import 'assets/css/spacing.css';
@import '~bulma/bulma.sass';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.page-wrapper {
  min-height: 55vh;
}

.bold {
  font-weight: bold;
}
.hero {
  position: relative;
}
.hero-body {
  padding: 3rem 1.5rem;
}
.hero-bg {
  background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0.0)), url('./assets/hero-background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-y: 15%;
}
.navbar-brand {
  margin-bottom: 40px;
}
// Nav styling
.is-hoverable {
  transition: 0.3s;

  &:hover {
      -webkit-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      -moz-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
    }
}
.navbar-item  {
    transition: 0.3s;
}
.burger-bars {
      position: fixed;
      top: 12px;
      right: 35px;
      z-index: 20;
      &:hover {
        width: 40px;
        height: 40px;
    }
}
</style>
