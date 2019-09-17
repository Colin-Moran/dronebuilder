<template>
  <div>
    <div class="container">
      <div id="CreateYourFAQContainer">
        <CreateYourFAQ></CreateYourFAQ>
      </div>
      <div id="HeresWhatItLooksLikeContainer">
        <div class="card is-hoverable large">
          <div class="card-content">
            <div class="title">Here's what it looks like...</div>
            <div class="card-image">
                  <figure class="image">
                      <img src="../assets/screenshot.png" alt="Image">
                  </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateYourFAQ from "@/components/CreateYourFAQ";

export default {
  components: {
    CreateYourFAQ
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}

#CreateYourFAQContainer {
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  padding: 10px;
}

#HeresWhatItLooksLikeContainer {
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  padding: 10px;
}
</style>
