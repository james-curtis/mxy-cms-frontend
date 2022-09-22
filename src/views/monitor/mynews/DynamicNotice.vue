<template>
  <component
    :is="currentModal"
    v-model:visible="modalVisible"
    :form-data="formData"
  />
</template>
<script setup lang="ts" name="dynamic-notice">
import {
  defineAsyncComponent,
  defineExpose,
  nextTick,
  ref,
  shallowRef,
} from 'vue';
import type { ComponentOptions } from 'vue';
const props = defineProps({
  path: { type: String, default: '' },
  formData: { type: Object, default: {} },
});
const modalVisible = ref<boolean>(false);
const currentModal = shallowRef<Nullable<ComponentOptions>>(null);
const formData = ref<any>(props.formData);

const componentType = {};

/**
 * 跟换组件和传值事件
 */
function detail() {
  setTimeout(() => {
    if (props.path) {
      nextTick(() => {
        currentModal.value = componentType[props.path];
        formData.value = props.formData;
        modalVisible.value = true;
      });
    }
  }, 200);
}

defineExpose({
  detail,
});
</script>
