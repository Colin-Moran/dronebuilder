<template>
  <div>
    <!-- <AppHero/> -->
    <div id="AboutContainer">
      <div class="card is-hoverable large">
          <div class="card-content">
            <p class="title">About</p>
          </div>
          <div class="content">
            <p class="subtitle">Hey,</p>
            <p class="subtitle">
            Thanks for checking out the site! If you can't tell, the goal of this site is to give people a place to make their own personal FAQ (frequently asked questions) page. I think just about everyone has had the experience of answering the same questions over and over again. Whats your major? How old are you? Do you play basketball? So the idea is to throw it in your social media bio and give the people the answers they want!
            </p>
            <p class="subtitle">On top of that, I also thought it was a fun but simple enough idea to learn Node.js and Vue.js with.</p>
            <p class="subtitle">Give it a shot and let me know if you have any suggestions!</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
};
</script>

<style scoped lang="scss">
.title {
  text-align: center;
}
.subtitle {
  text-align: left;
}
.container {
  text-align: center;
}

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

  .card {
    margin: 10px;
    padding: 10px;
    padding-bottom: 70px;
  }

  #AboutContainer {
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  padding: 10px;
}
</style>
