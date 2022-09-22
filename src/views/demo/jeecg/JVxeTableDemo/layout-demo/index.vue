<template>
  <a-card :bordered="false">
    <a-tabs>
      <a-tab-pane key="erp" tab="ERP布局模板">
        <erp-template />
      </a-tab-pane>
      <a-tab-pane key="1" tab="布局模板1">
        <template1 />
      </a-tab-pane>
      <a-tab-pane key="2" tab="布局模板2">
        <template2 />
      </a-tab-pane>
      <a-tab-pane key="3" tab="布局模板3">
        <template3 />
      </a-tab-pane>
      <a-tab-pane key="4" tab="布局模板4">
        <template4 />
      </a-tab-pane>
      <a-tab-pane key="5" tab="布局模板5">
        <template5 />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script lang="ts" setup>
import Template1 from './Template1.vue';
import Template2 from './Template2.vue';
import Template3 from './Template3.vue';
import Template4 from './Template4.vue';
import Template5 from './Template5.vue';
import ErpTemplate from './ErpTemplate.vue';
</script>

<style scoped></style>
