<template>
  <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="'/'" class="navbar-item" href="https://frequentlyasked.me">
        <h1 class="title is-4">frequentlyasked.me</h1>
      </router-link>
    </div>
    <div id="navbarBasicExample" class="navbar-menu is-active">
      <div class="navbar-start">
        <router-link :to="'/'" class="navbar-item">
          Home
        </router-link>

        <div class="navbar-item has-dropdown is-hoverable ">
          <a class="navbar-link">
            More
          </a>
          <div class="navbar-dropdown">
            <router-link to="about" class="navbar-item">
            About
            </router-link>
            <router-link to="contact" class="navbar-item">
              Contact
            </router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="user">
            Welcome {{user.name}}
          </div>
        </div>
        <div v-if="user" class="navbar-item is-hoverable">
          <a class="navbar-link">
              Account
          </a>
          <div class="row">
            <router-link :to="{name: 'PageProfile'}" class="navbar-item ">
                Profile
            </router-link>
            <div class="row">
            <a @click.prevent="logout" class="navbar-item ">
                Logout
            </a>
          </div>
          </div>
        </div>
        <div v-else class="navbar-item">
          <div class="buttons">
            <router-link :to="{name: 'PageRegister'}" class="button is-danger is-outlined is-hoverable">
              <strong>Sign up</strong>
            </router-link>
            <router-link :to="{name: 'PageLogin'}" class="button is-primary is-outlined is-hoverable">
              Log in
            </router-link>
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
          })
      },
      wireUpNavbar () {
        document.addEventListener('DOMContentLoaded', () => {
        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

          // Add a click event on each of them
          $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {

              // Get the target from the "data-target" attribute
              const target = el.dataset.target;
              const $target = document.getElementById(target);

              // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
              el.classList.toggle('is-active');
              $target.classList.toggle('is-active');
            });
          });
        }
      });
      }
    },
    created: function () {
      this.wireUpNavbar();
    }
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

.navbar-item  {
    transition: 0.3s;
}
</style>










