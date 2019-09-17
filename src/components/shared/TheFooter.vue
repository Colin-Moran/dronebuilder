<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <router-link to="/" class="link is-hoverable">
        frequentlyasked.me
      </router-link>
    </div>
  </footer>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="scss">
  .footer {
    margin-top: 60px;
    bottom:0;
    width:100%;
    height:30px;   /* Height of the footer */
    background-color: white;
    color: white;
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

.link {
  padding: 20px;
}
</style>
