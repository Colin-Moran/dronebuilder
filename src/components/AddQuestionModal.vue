<template>
  <div>
    <button @click="isOpen = !isOpen" class="button is-primary is-outlined is-medium m-t-sm is-hoverable">Add Answer</button>
    <div :class="['modal', {'is-active': isOpen}]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Answer</p>
          <button @click="isOpen = false" class="delete is-hoverable" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="title">Question</label>
              <textarea
                        v-model="question"
                        class="textarea transition"
                        placeholder="Do you play any instruments?"
                        rows="4"></textarea>
            </div>
            <div class="field">
              <label class="title">Answer</label>
              <textarea
                        v-model="answer"
                        class="textarea transition"
                        placeholder="Yes, if mayonnaise is an instrument."
                        rows="4"></textarea>
            </div>

          </form>
        </section>
        <footer class="modal-card-foot">
          <button @click="emitQuestion" class="button is-primary is-medium is-hoverable is-outlined">Add</button>
          <button @click="isOpen = false" class="button is-danger is-medium is-hoverable is-outlined">Cancel</button>
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
        user: {...this.authUser},
        question: this.question,
        answer: this.answer
      }
    },
    methods: {
      emitQuestion () {
        this.$emit('questionSubmitted', {user: this.user, question: this.question, answer: this.answer, done: () => this.isOpen = false })
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
