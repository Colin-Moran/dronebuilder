<template>
  <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="'/'" class="navbar-item" href="https://frequentlyasked.me">
        <h1 class="title is-4">frequentlyasked.me</h1>
      </router-link>
      <p @click.prevent="toggleNavbar" id="burgerMenuButton" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </p>
    </div>
    <div id="navMenu" class="navbar-menu">
      <div class="navbar-start">
        <div @click.prevent="toggleNavbar">
          <router-link :to="'/'" class="navbar-item">
            Home
          </router-link>
        </div>

        <div class="navbar-item has-dropdown is-hoverable ">
          <a class="navbar-link">
            More
          </a>
          <div class="navbar-dropdown">
            <div @click.prevent="toggleNavbar">
              <router-link to="about" class="navbar-item">
              About
              </router-link>
            </div>
            <div @click.prevent="toggleNavbar">
              <router-link to="contact" class="navbar-item">
                Contact
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="user">
            Welcome {{user.name}}
          </div>
        </div>
        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
              Account
          </a>
          <div class="navbar-dropdown">
            <div @click.prevent="toggleNavbar">
              <router-link :to="{name: 'PageProfile'}" class="navbar-item ">
                  Profile
              </router-link>
            </div>
            <hr class="navbar-divider">
            <a @click.prevent="logout" class="navbar-item" id="logoutButtonDiv">
                Logout
            </a>
          </div>
        </div>
        <div v-else class="navbar-item has-dropdown ">
          <div class="buttons">
            <div @click.prevent="toggleNavbar" id="signUpButtonDiv">
              <router-link :to="{name: 'PageRegister'}" class="button is-danger is-outlined is-hoverable">
                <strong>Sign up</strong>
              </router-link>
            </div>
            <div @click.prevent="toggleNavbar" id="loginButtonDiv">
              <router-link :to="{name: 'PageLogin'}" class="button is-primary is-outlined is-hoverable">
                Log in
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        'user': 'auth/authUser'
      })
    },
    methods: {
      logout () {
        this.$store.dispatch('auth/logout')
          .then(() => {
            this.$router.push('/')
            // Get all "navbar-burger" elements
            const navbarBurger = document.getElementById("burgerMenuButton")
            const navbarMenu = document.getElementById("navMenu")
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            navbarBurger.classList.toggle('is-active');
            navbarMenu.classList.toggle('is-active');
          })
      },
       toggleNavbar () {
        // Get all "navbar-burger" elements
        const navbarBurger = document.getElementById("burgerMenuButton")

        const navbarMenu = document.getElementById("navMenu")
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        navbarBurger.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
        }
      },
    }
</script>

<style scoped lang="scss">
.is-hoverable {
  transition: 0.3s;

  &:hover {
      -webkit-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      -moz-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
    }
}

.buttons {
  padding: 10px;
}

.navbar-item  {
    transition: 0.3s;
}

#logoutButtonDiv {
  padding: 5px;
}

#loginButtonDiv {
    padding: 5px;
}

#signUpButtonDiv {
    padding: 5px;
}

</style>

