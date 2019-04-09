<template>
  <div class="home">
    <div class="container">
      <div class="row">
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home'
}
</script>

<style lang="scss" scoped>
  .home {
    min-height: 100vh;
    padding-top: 175px;
    padding-bottom: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: padding .25s;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    @media (max-width: 991px) {
      align-items: flex-start;
      padding-top: 150px;
    }
  }
</style>
