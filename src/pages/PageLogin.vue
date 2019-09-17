<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black">Login</h3>
          <p class="subtitle has-text-black">Welcome back.</p>
          <div class="box">
            <figure class="avatar">
                <img src="https://avatars.dicebear.com/v2/avataaars/akl%2Cxawr.svg">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input v-model="form.email"
                         @blur="$v.form.email.$touch()"
                         class="input is-medium transition"
                         type="email"
                         placeholder="Email or Username"
                         autofocus=""
                         autocomplete="email">
                  <div v-if="$v.form.email.$error" class="form-error">
                    <span v-if="!$v.form.email.required" class="help is-danger">Email or username is required</span>
                   <!-- <span v-if="!$v.form.email.email" class="help is-danger">Email address is not valid</span> -->
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="form.password"
                         @blur="$v.form.password.$touch()"
                         class="input is-medium transition"
                         type="password"
                         placeholder="Your Password"
                         autocomplete="current-password">
                  <div v-if="$v.form.password.$error" class="form-error">
                    <span v-if="!$v.form.password.required" class="help is-danger">Password is required</span>
                  </div>
                </div>
              </div>
              <button @click.prevent="login"
                      :disabled="isFormInvalid"
                      class="button is-primary is-outlined is-hoverable is-large is-fullwidth">Login</button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link :to="{name: 'PageRegister'}">Create Account</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        form: {
          email: null,
          password: null
        }
      }
    },
    validations: {
      form: {
        email: {
          required,
        },
        password: {
          required
        }
      }
    },
    computed: {
      isFormInvalid () {
        return this.$v.form.$invalid
      }
    },
    methods: {
      login () {
        this.$v.form.$touch()
        this.$store.dispatch('auth/loginWithEmailAndPassword', this.form)
          .then(() => this.$router.push('/me'))
          .catch((errorMessage) => {
            this.$toasted.error(errorMessage, {duration: 5000})
          })
      }
    }
  }
</script>

<style scoped lang="scss">
.hero.is-success {
    background: #ffff;
}

.hero .nav,
.hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
}

.hero-body {
  padding: 0px;
}

.box {
    margin-top: 5rem;
}

.avatar {
    margin-top: -70px;
    padding-bottom: 20px;
}

.avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
}

input {
    font-weight: 300;
}

p {
    font-weight: 700;
}

p.subtitle {
    padding-top: 1rem;
}

.is-hoverable {
  transition: 0.3s;

  &:hover {
      -webkit-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      -moz-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
    }
}

.transition {
  transition: 0.3s;
}
</style>
