<template>
  <PageWrapper title="UseForm操作示例">
    <div class="mb-4">
      <a-button class="mr-2" @click="setProps({ labelWidth: 150 })">
        更改labelWidth
      </a-button>
      <a-button class="mr-2" @click="setProps({ labelWidth: 120 })">
        还原labelWidth
      </a-button>
      <a-button class="mr-2" @click="setProps({ size: 'large' })">
        更改Size
      </a-button>
      <a-button class="mr-2" @click="setProps({ size: 'default' })">
        还原Size
      </a-button>
      <a-button class="mr-2" @click="setProps({ disabled: true })">
        禁用表单
      </a-button>
      <a-button class="mr-2" @click="setProps({ disabled: false })">
        解除禁用
      </a-button>
      <a-button class="mr-2" @click="setProps({ compact: true })">
        紧凑表单
      </a-button>
      <a-button class="mr-2" @click="setProps({ compact: false })">
        还原正常间距
      </a-button>
      <a-button
        class="mr-2"
        @click="setProps({ actionColOptions: { span: 8 } })"
      >
        操作按钮位置
      </a-button>
    </div>
    <div class="mb-4">
      <a-button
        class="mr-2"
        @click="setProps({ showActionButtonGroup: false })"
      >
        隐藏操作按钮
      </a-button>
      <a-button class="mr-2" @click="setProps({ showActionButtonGroup: true })">
        显示操作按钮
      </a-button>
      <a-button class="mr-2" @click="setProps({ showResetButton: false })">
        隐藏重置按钮
      </a-button>
      <a-button class="mr-2" @click="setProps({ showResetButton: true })">
        显示重置按钮
      </a-button>
      <a-button class="mr-2" @click="setProps({ showSubmitButton: false })">
        隐藏查询按钮
      </a-button>
      <a-button class="mr-2" @click="setProps({ showSubmitButton: true })">
        显示查询按钮
      </a-button>
      <a-button
        class="mr-2"
        @click="
          setProps({
            resetButtonOptions: {
              disabled: true,
              text: '重置New',
            },
          })
        "
      >
        修改重置按钮
      </a-button>
      <a-button
        class="mr-2"
        @click="
          setProps({
            submitButtonOptions: {
              disabled: true,
              loading: true,
            },
          })
        "
      >
        修改查询按钮
      </a-button>
    </div>
    <CollapseContainer title="useForm示例">
      <BasicForm @register="register" @submit="handleSubmit" />
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { FormSchema } from '/@/components/Form/index';
import { BasicForm, useForm } from '/@/components/Form/index';
import { CollapseContainer } from '/@/components/Container/index';
import { useMessage } from '/@/hooks/web/useMessage';
import { PageWrapper } from '/@/components/Page';

const schemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '自定义placeholder',
      onChange: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field3',
    component: 'DatePicker',
    label: '字段3',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'fieldTime',
    component: 'RangePicker',
    label: '时间字段',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field4',
    component: 'Select',
    label: '字段4',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },
  {
    field: 'field5',
    component: 'CheckboxGroup',
    label: '字段5',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field7',
    component: 'RadioGroup',
    label: '字段7',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
];

export default defineComponent({
  components: { BasicForm, CollapseContainer, PageWrapper },
  setup() {
    const { createMessage } = useMessage();

    const [register, { setProps }] = useForm({
      labelWidth: 120,
      schemas,
      actionColOptions: {
        span: 24,
      },
      fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM']],
    });
    return {
      register,
      schemas,
      handleSubmit: (values: Recordable) => {
        createMessage.success(`click search,values:${JSON.stringify(values)}`);
      },
      setProps,
    };
  },
});
</script>
