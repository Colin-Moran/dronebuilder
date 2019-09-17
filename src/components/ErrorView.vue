<template>
  <div class="notFoundContainer">
    <div class="m-b-xxl">
      <h1 class="title">{{title}}</h1>
      <router-link :to="{name: navigateToPage}" class="button is-primary is-hoverable">{{navigateToText}}</router-link>
    </div>
    <h2 class="subtitle">{{status}}<span> :(</span></h2>
    <p>That is so sad...</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        required: true,
        type: String
      },
      status: {
        required: true,
        type: String
      },
      navigateToPage: {
        required: true,
        type: String
      },
      navigateToText: {
        required: true,
        type: String
      }
    }
  }
</script>

<style scoped lang="scss">
  .title {
    font-size: 40px;
  }
  .subtitle {
    font-size: 140px;
    text-align: center;
  }
  .notFoundContainer {
    margin-top: 80px;
  }
  .is-hoverable {
  transition: 0.3s;

  &:hover {
      -webkit-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      -moz-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
    }
}

    p {
      text-align: center;
    }
</style>
