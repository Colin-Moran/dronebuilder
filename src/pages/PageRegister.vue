<template>
    <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-black">Register</h3>
                    <p class="subtitle has-text-black">Let's get you signed up.</p>
                    <div class="box">
                        <figure class="avatar">
                            <img :src="form.avatar">
                        </figure>
                        <div id="generateAvatarBox">
                            <p class="content has-text-black">Don't like your avatar?</p>
                            <button id="generateAvatar" class="button is-medium is-warning has-text-white is-hoverable" @click="randAvatar">Randomize Avatar</button>
                            <p class="content has-text-grey is-small">You can use your own image link if you want, don't worry.</p>
                        </div>
                        <form>
                            <div class="field">
                                <div class="control">
                                    <input v-model="form.username" @blur="$v.form.username.$touch()" class="input is-medium transition" type="text" placeholder="Username">
                                    <div v-if="$v.form.username.$error" class="form-error">
                                        <span v-if="!$v.form.username.required" class="help is-danger">Username is required</span>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input v-model="form.name" @blur="$v.form.name.$touch()" class="input is-medium transition" type="text" placeholder="Name">
                                    <div v-if="$v.form.name.$error" class="form-error">
                                        <span v-if="!$v.form.name.required" class="help is-danger">Name is required</span>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input v-model="form.email" @blur="$v.form.email.$touch()" class="input is-medium transition" type="email" placeholder="Email">
                                    <div v-if="$v.form.email.$error" class="form-error">
                                        <span v-if="!$v.form.email.required" class="help is-danger">Email is required</span>
                                        <span v-if="!$v.form.email.email" class="help is-danger">Email address is not valid</span>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input v-model="form.avatar" @blur="$v.form.avatar.$touch()" class="input is-medium transition" type="text" placeholder="Profile Picture" autocomplete="">
                                    <div v-if="$v.form.avatar.$error" class="form-error">
                                        <span v-if="!$v.form.avatar.url" class="help is-danger">Url format is not valid!</span>
                                        <span v-if="!$v.form.avatar.supportedFileType" class="help is-danger">Selected file type is not valid!</span>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input v-model="form.password" @blur="$v.form.password.$touch()" class="input is-medium transition" type="password" placeholder="Password" autocomplete="new-password">
                                    <div v-if="$v.form.password.$error" class="form-error">
                                        <span v-if="!$v.form.password.required" class="help is-danger">Password is required</span>
                                        <span v-if="!$v.form.password.minLength" class="help is-danger">Password minimum length is 6 letters</span>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input v-model="form.passwordConfirmation" @blur="$v.form.passwordConfirmation.$touch()" class="input is-medium transition" type="password" placeholder="Confirm Password" autocomplete="off">
                                    <div v-if="$v.form.passwordConfirmation.$error" class="form-error">
                                        <span v-if="!$v.form.passwordConfirmation.required" class="help is-danger">Password is required</span>
                                        <span v-if="!$v.form.passwordConfirmation.sameAsPassword" class="help is-danger">Password confirmation should be the same as password</span>
                                    </div>
                                </div>
                            </div>
                            <button @click.prevent="register" type="submit" class="button is-danger is-large is-fullwidth is-hoverable is-outlined">Register</button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <router-link :to="{name:'PageLogin'}">Already have an account?</router-link>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { required, email, minLength, url, sameAs } from 'vuelidate/lib/validators'
import { supportedFileType } from '@/helpers/validators'
export default {
    data() {
        return {
            form: {
                username: null,
                name: null,
                email: null,
                avatar: null,
                password: null,
                passwordConfirmation: null,
            },
            avatarSeed: null,
            avatarReady: false
        }
    },
    validations: {
        form: {
            username: {
                // required
            },
            name: {
                // required
            },
            email: {
                required,
                email
            },
            avatar: {
                url,
                supportedFileType
            },
            password: {
                required,
                minLength: minLength(6)
            },
            passwordConfirmation: {
                required,
                sameAsPassword: sameAs('password')
            }
        }
    },
    methods: {
        register() {
            this.$v.form.$touch()
            this.$store.dispatch('auth/registerUser', this.form)
                .then(() => this.$router.push('/login'))
                .catch(errMessage => {
                    this.$toasted.error(errMessage, { duration: 5000 })
                })
        },
        rndStr(len) {
            let text = ""
            let chars = "abcdefghijklmnopqrstuvwxyz"

            for (let i = 0; i < len; i++) {
                text += chars.charAt(Math.floor(Math.random() * chars.length))
            }

            return text
        },
        randAvatar() {
        this.avatarReady = false
        let random = this.rndStr(8)
        this.avatarSeed = random
        this.form.avatar = 'https://avatars.dicebear.com/v2/avataaars/' + this.avatarSeed + '.svg'
        this.avatarReady = true
        }
    },
    mounted() {
        let random = this.rndStr(8)
        this.avatarSeed = random
        this.form.avatar = 'https://avatars.dicebear.com/v2/avataaars/' + this.avatarSeed + '.svg'
        this.avatarReady = true;
    }
}
</script>

<style scoped lang='scss'>

#generateAvatar {
  margin-bottom: 1em;
}
#generateAvatarBox {
  padding-bottom: 2em;
}
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
