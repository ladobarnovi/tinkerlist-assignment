<template>
  <AppHeader />
  <div class="search-container">
    <SearchInput />
  </div>
  <router-view/>
</template>

<style lang="scss">
@import "./assets/styles/reset";
@import "./assets/styles/global";
@import "assets/styles/weather-card";

html {
  font-family: "Roboto";
  background-color: #ebebeb;
  color: #1f1f1f;
}

.search-container {
  padding: 8px;
}
</style>
<script>
import AppHeader from '@/components/AppHeader'
import SearchInput from '@/components/SearchInput'
export default {
  components: { SearchInput, AppHeader }
}
</script>
