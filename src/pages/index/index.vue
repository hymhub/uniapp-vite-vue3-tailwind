<template>
  <view class="content">
    <h1 class="bg-[red]">abcdedfg</h1>
    <van-button type="primary" @click="show = true">打开 Popup</van-button>
    <van-popup :show="show" @close="onClose">Popup 内容</van-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const show = ref(false);

const onClose = () => {
  show.value = false;
}

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
