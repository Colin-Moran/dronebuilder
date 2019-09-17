<template>
  <div>
    <button @click="isOpen = !isOpen" class="button is-outlined m-t-sm is-hoverable is-small">Update Info</button>
    <div :class="['modal', {'is-active': isOpen}]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Profile</p>
          <button @click="isOpen = false" class="delete is-hoverable" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="subtitle">Name</label>
              <input v-model="user.name"
                     class="input is-small transition">
            </div>
            <div class="field">
              <label class="subtitle">Username</label>
              <input v-model="user.username"
                     class="input transition">
            </div>
            <div class="field">
              <label class="subtitle">Profile Picture</label>
              <input v-model="user.avatar"
                     class="input transition">
            </div>
            <div class="field">
              <label class="subtitle">Bio</label>
              <textarea v-model="user.info"
                     class="textarea transition">
              </textarea>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button @click="emitUser" class="button is-primary is-hoverable is-medium is-outlined">Save changes</button>
          <button @click="isOpen = false" class="button is-hoverable is-danger is-medium is-outlined">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      authUser: {
        required: true,
        type: Object
      }
    },
    data () {
      return {
        isOpen: false,
        user: {...this.authUser}
      }
    },
    methods: {
      emitUser () {
        this.$emit('userSubmitted', {user: this.user, done: () => this.isOpen = false })
      }
    }
  }
</script>

<style lang="scss">
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
