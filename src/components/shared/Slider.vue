<template>
  <div>
    <!-- Nav Links -->
    <div ref="slider" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click="closeMenu()">&times;</a>
      <div class="column">
        <div class="navbar-brand">
          <router-link :to="'/'" class="navbar-item" href="https://frequentlyasked.me">
          <h1 class="title is-4">frequentlyasked.me</h1>
          </router-link>
      </div>
      <div class="row" @click="closeMenu()">
        <router-link :to="'/'" class="navbar-item">
          Home
        </router-link>
      </div>
      <div class="row" @click="closeMenu()">
            <router-link to="about" class="navbar-item">
            About
            </router-link>
      </div>

      <br />
        <div class="navbar-item">
          <div v-if="user">
            Welcome {{user.name}}
          </div>
        </div>
        <div v-if="user" class=" is-hoverable" @click="closeMenu()">
          <div class="row">
            <router-link :to="{name: 'PageProfile'}" class="navbar-item " @click="closeMenu()">
                Profile
            </router-link>
          </div>
          <br/>
            <div class="row">
            <a @click.prevent="logout" class="navbar-item logout">
                Logout
            </a>
          </div>
        </div>
        <div v-else>
            <div class="row" @click="closeMenu()">
            <router-link :to="{name: 'PageRegister'}" class="button is-danger is-outlined is-hoverable">
              Sign up
            </router-link>
            </div>
            <br />
            <div class="row" @click="closeMenu()">
            <router-link :to="{name: 'PageLogin'}" class="button is-primary is-outlined is-hoverable">
                Log in
            </router-link>
            </div>
        </div>
        </div>
    </div>
    <!-- Hamburger Menu -->
    <nav ref="menuIcon" class="topnav">
      <a href="javascript:void(0)" @click="openMenu()">
        <svg width="30" height="30" id="icoOpen">
          <path d="M0,5 30,5" :stroke="styles['menu-icon-color']" stroke-width="5"/>
          <path d="M0,14 30,14" :stroke="styles['menu-icon-color']" stroke-width="5"/>
          <path d="M0,23 30,23" :stroke="styles['menu-icon-color']" stroke-width="5"/>
        </svg>
      </a>
    </nav>
  </div>
</template>

<script>
import styles from '@/assets/css/variables.scss'
import {mapGetters} from 'vuex'
import utilities from '@/assets/js/utilities'
export default {
  name: 'slider',
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
  props: {
    width: {
      type: Number,
      required: false,
      default: 250
    },
    format: {
      type: String,
      required: false,
      default: 'overlay'
    },
    direction: {
      type: String,
      required: false,
      default: 'left'
    },
    opacity: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      styles: styles
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.direction === 'right') {
        this.setRightMenu()
      } else {
        this.setLeftMenu()
      }
    },
    setLeftMenu () {
      this.$refs.slider.style.left = '0'
      this.$refs.menuIcon.style.float = 'left'
    },
    setRightMenu () {
      this.$refs.slider.style.right = '0'
      this.$refs.menuIcon.style.float = 'right'
    },
    openMenu () {
      if (this.opacity) {
        document.body.style.backgroundColor = utilities.hexToRGB(styles['background-color'], this.opacity)
      }
      switch (this.format) {
        case 'push': {
          const width = this.width.toString() + 'px'
          this.$refs.slider.style.width = width
          let parentRefStyle = this.$parent.$refs.app.style
          if (this.direction === 'right') {
            parentRefStyle.marginRight = width
            parentRefStyle.transition = 'margin-right .5s'
          } else {
            parentRefStyle.marginLeft = width
            parentRefStyle.transition = 'margin-left .5s'
          }
          break
        }
        case 'full':
          this.$refs.slider.style.width = '100%'
          break
        default:
          this.$refs.slider.style.width = this.width.toString() + 'px'
          break
      }
    },
    closeMenu () {
      this.$refs.slider.style.width = '0'
      this.$parent.$refs.app.style.marginLeft = '0'
      this.$parent.$refs.app.style.marginRight = '0'
      if (this.opacity) {
        document.body.style.backgroundColor = styles['background-color']
      }
    },
    logout () {
        this.$store.dispatch('auth/logout')
          .then(() => {
            this.$router.push('/')
          })
      }
    },
    created () {
        this.$store.dispatch('meta/fetchMetaData')
    }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/variables.scss';

  .butttonDiv {
      text-align: center;
      margin: 20px;
  }

  body {
    background-color: $background-color;
    transition: background-color .5s;
  }
  /* The side navigation menu */
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
.bm-burger-bars {
      background-color: #ffff;
      -webkit-box-shadow: 2px 4px 15px -2px rgb(0, 0, 0);
      -moz-box-shadow: 2px 4px 15px -2px rgb(0, 0, 0);
      box-shadow: 2px 4px 15px -2px rgb(0, 0, 0);
}
.bm-overlay {
      background: rgba(255, 255, 255, 0);
}
.bm-menu {
      height: 100%; /* 100% Full-height */
      width: 0; /* 0 width - change this with JavaScript */
      position: fixed; /* Stay in place */
      z-index: 1000; /* Stay on top */
      top: 0;
      left: 0;
      background-color: #ffff; /* Black*/
      overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 60px; /* Place content 60px from the top */
      transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/

      -webkit-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      -moz-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);

  }
  .sidenav {
    font-family: $font-family-sans-serif;
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    background-color: $menu-background;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    /* Menu Links */
    a {
      padding: 8px 8px 8px 32px;
      text-decoration: none;
      font-size: 25px;
      color: $menu-text;
      display: block;
      transition: 0.3s;
      &:hover {
        color: $menu-text-hover;
      }
    }
    /* Position and style the close button (top right corner) */
    .closebtn {
      position: absolute;
      top: 0;
      right: 25px;
      font-size: 36px;
      margin-left: 50px;
    }
  }
  /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
  #app {
    transition: margin-left .5s;
    transition: margin-right .5s;
    padding: 20px;
  }

  strong {
      text-align: center;
  }
  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
      a {
        font-size: 18px;
      }
    }
  }
</style>