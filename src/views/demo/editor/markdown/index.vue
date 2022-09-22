<template>
  <PageWrapper title="MarkDown组件示例">
    <div>
      <a-button class="mb-2" type="primary" @click="toggleTheme">
        黑暗主题
      </a-button>
      <a-button class="mb-2" type="default" @click="clearValue">
        清空内容
      </a-button>
      <MarkDown
        ref="markDownRef"
        v-model:value="value"
        placeholder="这是占位文本"
        @change="handleChange"
      />
    </div>
    <div class="mt-2">
      <a-card title="Markdown Viewer 组件演示">
        <MarkdownViewer :value="value" />
      </a-card>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue';
import { Card } from 'ant-design-vue';
import type { MarkDownActionType } from '/@/components/Markdown';
import { MarkDown, MarkdownViewer } from '/@/components/Markdown';
import { PageWrapper } from '/@/components/Page';

export default defineComponent({
  components: { MarkDown, PageWrapper, MarkdownViewer, ACard: Card },
  setup() {
    const markDownRef = ref<Nullable<MarkDownActionType>>(null);
    const valueRef = ref(`
# title

# content
`);

    function toggleTheme() {
      const markDown = unref(markDownRef);
      if (!markDown) return;
      const vditor = markDown.getVditor();
      vditor.setTheme('dark');
    }

    function handleChange(v: string) {
      valueRef.value = v;
    }

    function clearValue() {
      valueRef.value = '';
    }

    return {
      value: valueRef,
      toggleTheme,
      markDownRef,
      handleChange,
      clearValue,
    };
  },
});
</script>
