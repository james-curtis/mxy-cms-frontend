<template>
  <a-date-picker
    :value="innerDateValue"
    allow-clear
    :format="dateFormat"
    :show-time="isDatetime"
    dropdown-class-name="j-vxe-date-picker"
    style="min-width: 0"
    v-bind="cellProps"
    @change="handleChange"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { dispatchEvent } from '/@/components/jeecg/JVxeTable/utils';
import type { JVxeComponent } from '/@/components/jeecg/JVxeTable/types';
import { JVxeTypes } from '/@/components/jeecg/JVxeTable/types';
import {
  useJVxeCompProps,
  useJVxeComponent,
} from '/@/components/jeecg/JVxeTable/hooks';
import { isEmpty } from '/@/utils/is';

export default defineComponent({
  name: 'JVxeDateCell',
  props: useJVxeCompProps(),
  setup(props: JVxeComponent.Props) {
    const { innerValue, cellProps, originColumn, handleChangeCommon } =
      useJVxeComponent(props);
    const innerDateValue = ref<any>(null);
    const isDatetime = computed(() => props.type === JVxeTypes.datetime);
    const dateFormat = computed(() => {
      const format = originColumn.value.format;
      return format
        ? format
        : isDatetime.value
        ? 'YYYY-MM-DD HH:mm:ss'
        : 'YYYY-MM-DD';
    });
    watch(
      innerValue,
      (val) => {
        if (val == null || isEmpty(val)) {
          innerDateValue.value = null;
        } else {
          innerDateValue.value = dayjs(val, dateFormat.value);
        }
      },
      { immediate: true }
    );

    function handleChange(_mom, dateStr) {
      handleChangeCommon(dateStr);
    }

    return {
      cellProps,
      isDatetime,
      dateFormat,
      innerDateValue,
      handleChange,
    };
  },
  // 【组件增强】注释详见：JVxeComponent.Enhanced
  enhanced: {
    aopEvents: {
      editActived({ $event, row, column }) {
        dispatchEvent({
          $event,
          row,
          column,
          props: this.props,
          instance: this,
          className: '.ant-calendar-picker',
          isClick: false,
          handler: (el) => el.children[0].click(),
        });
      },
    },
  } as JVxeComponent.EnhancedPartial,
});
</script>
