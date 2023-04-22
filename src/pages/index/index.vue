<template>
  <view class="content">
    <h1 class="bg-[red] text-[40rpx]">title</h1>
    <p class="text-[blue] text-[32rpx]">{{ msg }}</p>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const msg = ref('hello')

onLoad(() => {
  console.log('on page loaded!')
});
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
