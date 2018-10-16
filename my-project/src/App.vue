<template>
    <div id="apps">
        <!-- <img src="./assets/logo.png"> -->
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "Appd"
};
</script>

<style>
#apps {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  flex: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
