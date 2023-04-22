<template>
  <view class="content">
    <h1 class="bg-[red]">abcdedfg</h1>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';


onLoad(() => {
  console.log('on page loaded!')
});
</script>

<style lang="scss">
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
