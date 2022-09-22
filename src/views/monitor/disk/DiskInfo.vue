<template>
  <Skeleton v-if="spinning" active />
  <div v-else>
    <a-row>
      <template v-if="diskInfo && diskInfo.length > 0">
        <a-col
          v-for="(item, index) in diskInfo"
          :key="'diskInfo' + index"
          :span="6"
        >
          <gauge :data="item" />
        </a-col>
      </template>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Skeleton } from 'ant-design-vue';
import { queryDiskInfo } from './disk.api';
import gauge from './gauge.vue';

const diskInfo = ref([]);
const spinning = ref(true);

function loadRedisInfo() {
  queryDiskInfo()
    .then((res) => {
      for (const re of res) {
        // 当前算法算的是磁盘的已使用空间
        re.restPPT = 100 - Number.parseInt(String((re.rest / re.max) * 100));
      }
      diskInfo.value = res;
    })
    .finally(() => (spinning.value = false));
}

onMounted(() => {
  loadRedisInfo();
});
</script>
