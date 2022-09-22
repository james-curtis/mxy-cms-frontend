<template>
  <PageWrapper>
    <a-card :bordered="false">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="基础示例">
          <JVxeDemo1 />
        </a-tab-pane>
        <a-tab-pane key="2" tab="高级示例">
          <JVxeDemo2 />
        </a-tab-pane>
        <a-tab-pane key="3" tab="排序示例">
          <JVxeDemo3 />
        </a-tab-pane>
        <a-tab-pane key="4" tab="联动示例">
          <JVxeDemo4 />
        </a-tab-pane>
        <a-tab-pane key="5" tab="键盘操作">
          <JVxeDemo5 />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
// noinspection ES6UnusedImports
import { PageWrapper } from '/@/components/Page';
import JVxeDemo1 from './JVxeDemo1.vue';
import JVxeDemo2 from './JVxeDemo2.vue';
import JVxeDemo3 from './JVxeDemo3.vue';
import JVxeDemo4 from './JVxeDemo4.vue';
import JVxeDemo5 from './JVxeDemo5.vue';
</script>
