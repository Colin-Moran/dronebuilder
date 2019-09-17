<template>
    <div class="card is-hoverable large">
        <div class="card-content">
          <span class="title">Create your own FAQ</span>
        </div>
        <div class="content">
          <p class="subtitle">
           Create your own personal FAQ! Just add the questions and answers that you think people would like to know and then throw the link in your bio on your social media accounts. The really handy part is the easily shareable link.
          </p>
          <p class="subtitle">
            frequentlyasked.me/yourusername
          </p>
          <div id="getstarted">
                <router-link to="me">
                  <button class="button is-large is-primary is-outlined is-hoverable">Create FAQ</button>
                </router-link>
          </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
    }
  }
</script>

<style scoped lang="scss">
  .card-meetup-link {
    color: black;
  }

  .subtitle {
    padding: 15px;
    text-align: center;
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
    padding: 15px;
  }
</style>
