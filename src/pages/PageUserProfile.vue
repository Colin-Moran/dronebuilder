<template>
  <div class="columns">
    <div class="container profile">
      <div class="section profile-heading">
        <div class="columns is-mobile is-multiline">
          <div class="column is-2">
            <figure class="image  header-icon user-profile-image">
              <img class="is-rounded" :src="avatar"/>
            </figure>
          </div>
          <div class="column is-4-tablet is-10-mobile name">
            <p>
              <span v-if="faqs.length > 0" class="title is-bold">{{faqs[0].faqCreatorName}}</span>
            </p>
            <br/>
            <p class="tagline">
              {{bio}}
            </p>
          </div>

          <div @click="activeTab = 'faqs'"
               :class="{isActive: activeTab === 'faqs'}"
               class="stats-tab column s-2-tablet is-4-mobile has-text-centered">
            <p v-if="faqs.length > 0" class="stat-val">{{faqsCount}}</p>
            <p class="stat-key">Answers</p>
         </div>
      </div>
      </div>

    <div v-if="faqs.length > 0">
      <div v-if="activeTab === 'faqs'" class="rows is-mobile is-multiline">
        <div v-for="faq in faqs" :key="faq._id" class="column">
          <UserFAQ v-bind:question="faq.question"
                   v-bind:answer="faq.answer"></UserFAQ>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import UserFAQ from '@/components/FAQ'
  import { mapState } from 'vuex'
  export default {

    components: {
      UserFAQ,
    },
    data () {
      return {
        activeTab: 'faqs',
      }
    },
    computed: {
      ...mapState({
        user: state => state.auth.user,
        faqs: state => state.stats.faqs.data,
        faqsCount: state => state.stats.faqs.count,
        avatar: state => state.stats.faqs.avatar,
        bio: state => state.stats.faqs.bio
      })
    },
    created () {
      const username = this.$route.params.username
      this.$store.dispatch('stats/fetchUsernameStats', username)
    },
    methods: {
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

UserFAQ {
  width: 100%;
}
</style>
