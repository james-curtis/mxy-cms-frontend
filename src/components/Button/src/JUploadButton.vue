<template>
  <a-upload
    name="file"
    :show-upload-list="false"
    :custom-request="(file) => onClick(file)"
  >
    <Button :type="type" :class="getButtonClass">
      <template #default="data">
        <Icon v-if="preIcon" :icon="preIcon" :size="iconSize" />
        <slot v-bind="data || {}" />
        <Icon v-if="postIcon" :icon="postIcon" :size="iconSize" />
      </template>
    </Button>
  </a-upload>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue';
</script>
<script lang="ts" setup>
import { Button } from 'ant-design-vue';
import Icon from '/@/components/Icon/src/Icon.vue';
import { buttonProps } from './props';
import { useAttrs } from '/@/hooks/core/useAttrs';
export default defineComponent({
  name: 'JUploadButton',
  inheritAttrs: false,
});
const props = defineProps(buttonProps);
// get component class
const attrs = useAttrs({ excludeDefaultKeys: false });
const getButtonClass = computed(() => {
  const { color, disabled } = props;
  return [
    {
      [`ant-btn-${color}`]: !!color,
      [`is-disabled`]: disabled,
    },
  ];
});

// get inherit binding value
const getBindValue = computed(() => ({ ...unref(attrs), ...props }));
</script>
