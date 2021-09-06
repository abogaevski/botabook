<template>
  <!--  Loader -->
  <div class="page d-flex flex-row flex-column flex-column-fluid">
    <Aside></Aside>
    <div class="d-flex flex-column flex-row-fluid wrapper">
      <Header></Header>
      <div class="content d-flex flex-column flex-column-fluid">
        <div class="post d-flex flex-column-fluid">
          <div class="container">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <!--    Footer    -->
    </div>
  </div>
</template>

<script>
import Aside from './aside/Aside.vue'
import Header from './header/Header.vue';

export default {
  components: {
    Aside, Header
  }
}
</script>

<style>

</style>
