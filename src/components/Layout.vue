<template>
  <div class="main-container">
    <sidebar class="side-bar"/>
    <div class="main-view">
      <Header />
      <AppMain />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import AppMain from '@/components/AppMain';

export default {
  name: 'layout',
  components: {
    Header,
    Sidebar,
    AppMain
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  min-height: 100vh;
}
.side-bar {
  border: none;
  min-width: 210px;
  max-width: 210px;
}
.main-view {
  min-height: 100%;
  width: calc(100% - 210px);
  transition: margin-left .28s;
}
</style>
