<template>
    <div class="card is-hoverable large">
        <div class="card-content">
          <p class="title">Contact</p>
        </div>
        <div class="content">
          <p>Feel free to reach out to me on instagram @colin.moran or by email at colinmoran123@yahoo.com</p>
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
.card-content {
  text-align: center;
}
.title {
  text-align: center;
}

.subtitle {
  text-align: center;
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
    padding: 100px;
  }
</style>