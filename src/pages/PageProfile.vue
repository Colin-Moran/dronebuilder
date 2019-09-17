<template>
  <div class="columns">
    <div class="container profile">
      <div class="section profile-heading">
        <div class="columns is-mobile is-multiline">
          <div class="column is-2">
            <figure class="image  header-icon user-profile-image">
              <!-- TODO: Get user avatar here -->
              <img class="is-rounded" :src="user.avatar"/>
            </figure>
          </div>
          <div class="column is-10 is-10-tablet is-10-mobile name">
            <div class="column is-mobile">
               <UserUpdateModal :authUser="user"
                               @userSubmitted="updateUser" />
              </div>
            <p>
              <!-- TODO: Display user name here -->
              <span class="title is-bold">{{user.name}}</span>
              <br/>
              <br/>
            </p>
            <!-- TODO: User info Here if any -->
            <p class="tagline">
              {{user.info}}
            </p>
          </div>
          <div class="column is-two-quarters">
          <div class="add-question">
            <AddQuestionModal :authUser="user"
                                @questionSubmitted="addQuestion" />
            </div>
          </div>
          <div v-if="faqs.length > 0" @click="activeTab = 'faqs'"
               :class="{isActive: activeTab === 'faqs'}"
               class="stats-tab column  is-two-quarters is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">{{faqsCount}}</p>
            <p class="stat-key">Answers</p>
         </div>
      </div>
      </div>

    <div v-if="faqs.length > 0">
      <div v-if="activeTab === 'faqs'" class="rows is-mobile is-multiline">
        <div v-for="faq in faqs" :key="faq._id" class="column">
          <UserFAQ v-bind:question="faq.question"
                   v-bind:answer="faq.answer"
                   v-bind:_id="faq._id"
                   v-bind:faqCreator="faq.faqCreator"></UserFAQ>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import UserUpdateModal from '@/components/UserUpdateModal'
  import AddQuestionModal from '@/components/AddQuestionModal'
  import UserFAQ from '@/components/FAQWithOptions'
  import { mapState } from 'vuex'
  export default {

    components: {
      UserUpdateModal,
      UserFAQ,
      AddQuestionModal
    },

    data () {
      return {
        activeTab: 'faqs'
      }
    },
    computed: {
      ...mapState({
        user: state => state.auth.user,
        faqs: state => state.stats.faqs.data,
        faqsCount: state => state.stats.faqs.count,
      }),
    },
    created () {
      this.$store.dispatch('stats/fetchUserStats')
    },
    methods: {
      updateUser ({user, done}) {
        this.$store.dispatch('auth/updateUser', user)
          .then(() => {
            this.$toasted.success('Profile Successfuly Updated', {duration: 3000})
            done()
          })
          .catch(err => {
            console.log(err)
            done()
          })
      },
      addQuestion ({user, question, answer, done}) {
        const faq = {
          user: user,
          question: question,
          answer: answer
        }
        this.$store.dispatch('auth/addQuestion', faq)
          .catch(err => {
            console.log(err)
            done()
          })
          .then(() =>{
            this.$toasted.success('Question Successfully added!', {duration: 3000})
            done()
            return new Promise(function(resolve) {
                    setTimeout(() => {
                    resolve();
                    }, 2000)
            });
          }).then(() => {
            this.$router.go()
          })
      },
      deleteQuestion ({user, _id, faqCreator,done}) {
        const faq = {
          user: user,
          _id: _id,
          faqCreator: faqCreator
        }
        this.$store.dispatch('auth/deleteQuestion', faq)
          .catch(err => {
            console.log(err)
            done()
          })
          .then(() =>{
            this.$toasted.success('Question Successfully deleted!', {duration: 3000})
            done()
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
.add-question {
  margin: 10px;
}
  body {
    background: #F5F7FA
  }

  .stats-tab {
    border-bottom: 2px solid transparent;
    transition: 0.5s;
    margin-right: 10px;
  }

  .stats-tab:hover {
    cursor: pointer;
    border-bottom: 2px solid black;
  }

  .stats-tab.isActive {
    border-bottom: 2px solid black;
  }

  .stat-val {
    font-size: 2em;
    padding: 0px;
    font-weight: bold;
  }

  .stat-key {
    font-size: 1.4em;
    font-weight: 200
  }

  .section.profile-heading .column.is-2-tablet.has-text-centered + .has-text-centered {
    border-left: 1px dotted rgba(0, 0, 0, .2);
  }

  .container.profile {
    margin-top: 1%;
  }

  .control.is-pulled-left span.select {
    margin-right: 5px;
    border-radius: 2px;
  }

  .modal-card .content h1 {
    padding: 40px 10px 10px;
    border-bottom: 1px solid #dadada
  }

  .container.profile .profile-options .tabs ul li.link a {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #F1F1F1;
  }
    .is-hoverable {
    transition: 0.3s;

    &:hover {
      -webkit-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      -moz-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
    }
  }

.add-question {
  margin-top: 20px;
}
UserFAQ {
  width: 100%;
}
</style>
