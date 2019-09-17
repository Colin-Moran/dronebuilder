<template>
    <div class="card is-hoverable large">
        <div class="card-content">
          <span class="title">Q: {{question}}</span>
        </div>
        <div class="content">
          <p class="subtitle">
            A: {{answer}}
          </p>
        </div>
        <footer class="card-footer">
              <a @click="deleteQuestion" class="card-footer-item is-hoverable">Delete</a>
        </footer>
    </div>
</template>

<script>
  export default {
    props: {
      question: String,
      answer: String,
      faqCreator: String,
      _id: String
    },
    data () {
      return {
        user: {...this.authUser}
      }
    },
    methods: {
      emitFAQ () {
        this.$emit('deleteQuestion', {user: this.user, _id: this._id, faqCreator: this.faqCreator, done: () => console.log("Post Deleted.")})
        console.log("emit1")
      },
      deleteQuestion () {
        const faq = {
          user: this.user,
          _id: this._id,
          faqCreator: this.faqCreator
        }
        console.log("emit2")
        this.$store.dispatch('auth/deleteQuestion', faq)
          .catch(err => {
            console.log(err)
          })
          .then(() =>{
            this.$toasted.success('Question Successfully deleted!', {duration: 3000})
            return new Promise(function(resolve) {
                    setTimeout(() => {
                    resolve();
                    }, 2000)
            });
          }).then(() => {
            this.$router.go()
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .card-meetup-link {
    color: black;
  }

  .is-hoverable {
    transition: 0.3s;

    &:hover {
      -webkit-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      -moz-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
    }
  }

  #getstarted {
    padding: 40px;
  }

  .card-footer-item {
    color: #EF476F;

    &:hover {
    background-color: #EF476F;
    color: white;
    }
  }

  .content {
    padding: 20px;
  }
</style>
