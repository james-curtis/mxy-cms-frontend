<template>
  <Tooltip placement="top" v-bind="getBindProps">
    <template #title>
      <span>{{ t('component.table.settingFullScreen') }}</span>
    </template>
    <FullscreenOutlined v-if="!isFullscreen" @click="toggle" />
    <FullscreenExitOutlined v-else @click="toggle" />
  </Tooltip>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Tooltip } from 'ant-design-vue';
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '@ant-design/icons-vue';
import { useFullscreen } from '@vueuse/core';
import { useI18n } from '/@/hooks/web/useI18n';
import { useTableContext } from '../../hooks/useTableContext';

export default defineComponent({
  name: 'FullScreenSetting',
  components: {
    FullscreenExitOutlined,
    FullscreenOutlined,
    Tooltip,
  },
  props: {
    isMobile: Boolean,
  },

  setup(props) {
    const table = useTableContext();
    const { t } = useI18n();
    const { toggle, isFullscreen } = useFullscreen(table.wrapRef);
    const getBindProps = computed(() => {
      const obj = {};
      if (props.isMobile) {
        obj['visible'] = false;
      }
      return obj;
    });
    return {
      getBindProps,
      toggle,
      isFullscreen,
      t,
    };
  },
});
</script>
