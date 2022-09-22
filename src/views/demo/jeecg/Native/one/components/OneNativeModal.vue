<template>
  <BasicModal
    :title="title"
    :width="width"
    :visible="visible"
    :height="600"
    :ok-button-props="{ class: { 'jee-hidden': disableSubmit } }"
    cancel-text="关闭"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <OneNativeForm
      ref="realForm"
      :disabled="disableSubmit"
      @ok="submitCallback"
    />
  </BasicModal>
</template>

<script lang="ts" setup>
import { defineExpose, nextTick, ref } from 'vue';
import OneNativeForm from './OneNativeForm.vue';
import { BasicModal } from '/@/components/Modal';

const title = ref<string>('');
const width = ref<number>(800);
const visible = ref<boolean>(false);
const disableSubmit = ref<boolean>(false);
const realForm = ref();
const emit = defineEmits(['register', 'ok']);

function add() {
  title.value = '新增';
  visible.value = true;
  nextTick(() => {
    realForm.value.add();
  });
}

function edit(record) {
  title.value = disableSubmit.value ? '详情' : '编辑';
  visible.value = true;
  nextTick(() => {
    realForm.value.edit(record);
  });
}

function handleOk() {
  realForm.value.submitForm();
}

function submitCallback() {
  handleCancel();
  emit('ok');
}

function handleCancel() {
  visible.value = false;
}

defineExpose({
  add,
  edit,
  disableSubmit,
});
</script>

<style lang="less" scoped></style>
