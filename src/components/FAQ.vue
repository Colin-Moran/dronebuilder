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
    </div>
</template>

<script>
  export default {
    props: {
      question: String,
      answer: String
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

  .content {
    padding: 20px;
  }
</style>
