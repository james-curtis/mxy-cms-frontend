<template>
  <Tooltip placement="top" v-bind="getBindProps">
    <template #title>
      <span>{{ t('component.table.settingDens') }}</span>
    </template>

    <Dropdown
      placement="bottom"
      :trigger="['click']"
      :get-popup-container="getPopupContainer"
    >
      <ColumnHeightOutlined />
      <template #overlay>
        <Menu
          v-model:selectedKeys="selectedKeysRef"
          selectable
          @click="handleTitleClick"
        >
          <MenuItem key="default">
            <span>{{ t('component.table.settingDensDefault') }}</span>
          </MenuItem>
          <MenuItem key="middle">
            <span>{{ t('component.table.settingDensMiddle') }}</span>
          </MenuItem>
          <MenuItem key="small">
            <span>{{ t('component.table.settingDensSmall') }}</span>
          </MenuItem>
        </Menu>
      </template>
    </Dropdown>
  </Tooltip>
</template>
<script lang="ts">
import type { SizeType } from '../../types/table';
import { computed, defineComponent, ref } from 'vue';
import { Dropdown, Menu, Tooltip } from 'ant-design-vue';
import { ColumnHeightOutlined } from '@ant-design/icons-vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { useTableContext } from '../../hooks/useTableContext';
import { getPopupContainer } from '/@/utils';

export default defineComponent({
  name: 'SizeSetting',
  components: {
    ColumnHeightOutlined,
    Tooltip,
    Dropdown,
    Menu,
    MenuItem: Menu.Item,
  },
  props: {
    isMobile: Boolean,
  },
  setup(props) {
    const table = useTableContext();
    const { t } = useI18n();

    const selectedKeysRef = ref<SizeType[]>([table.getSize()]);
    const getBindProps = computed(() => {
      const obj = {};
      if (props.isMobile) {
        obj['visible'] = false;
      }
      return obj;
    });
    function handleTitleClick({ key }: { key: SizeType }) {
      selectedKeysRef.value = [key];
      table.setProps({
        size: key,
      });
    }

    return {
      getBindProps,
      handleTitleClick,
      selectedKeysRef,
      getPopupContainer,
      t,
    };
  },
});
</script>
