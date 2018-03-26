<<<<<<< HEAD
<template>
  <div id='app'>
    <transition name='slide-fade' mode='out-in'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {}
</script>

<style>
body, html {
  height: 100%;
  font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  background: #f0f2f5;
}

#app {
  height: 100%;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
=======
<template>
  <div id='app'>
    <transition name='slide-fade' mode='out-in'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {}
</script>

<style>
body, html {
  height: 100%;
  font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  background: #f0f2f5;
}

#app {
  height: 100%;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
