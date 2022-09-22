<template>
  <BasicForm
    :label-width="200"
    :schemas="schemas"
    :show-reset-button="false"
    :show-submit-button="false"
    :action-col-options="{ span: 24 }"
    style="height: 800px"
    @submit="handleSubmit"
    @reset="handleReset"
  >
    <template #jCodeEdit="{ model, field }">
      <JCodeEditor
        v-model:value="model[field]"
        mode="js"
        height="300px"
        :full-screen="true"
      />
    </template>
  </BasicForm>
</template>
<script lang="ts">
import { computed, defineComponent, ref, unref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import type { FormSchema } from '/@/components/Form';
import { BasicForm, JCodeEditor } from '/@/components/Form';
import { useMessage } from '/@/hooks/web/useMessage';
import { optionsListApi } from '/@/api/demo/select';

const schemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'JCodeEditor',
    label: '代码编辑器',
    required: true,
    slot: 'jCodeEdit',
    colProps: {
      span: 15,
    },
    defaultValue: 'Hello JeecgBoot',
  },
];

export default defineComponent({
  components: { BasicForm, JCodeEditor },
  setup() {
    const check = ref(null);
    const { createMessage } = useMessage();
    const keyword = ref<string>('');
    const searchParams = computed<Recordable>(() => {
      return { keyword: unref(keyword) };
    });

    function onSearch(value: string) {
      keyword.value = value;
    }

    return {
      schemas,
      optionsListApi,
      onSearch: useDebounceFn(onSearch, 300),
      searchParams,
      handleReset: () => {
        keyword.value = '';
      },
      handleSubmit: (values: any) => {
        createMessage.success(`click search,values:${JSON.stringify(values)}`);
      },
      check,
    };
  },
});
</script>
