<template>
  <div class="home">
    <div class="d-flex justify-space-between">
      <div class="single">
        <single-upload />
      </div>

      <div class="multiple">
        <multi-upload />
      </div>
    </div>

    <div class="dropzone">
      <dropzone />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  
}
</script>

<style scoped>
.home {
  padding: 2rem;
}
</style>