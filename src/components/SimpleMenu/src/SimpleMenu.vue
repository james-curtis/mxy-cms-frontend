<template>
  <Menu
    v-bind="getBindValues"
    :active-name="activeName"
    :open-names="getOpenKeys"
    :class="prefixCls"
    :active-sub-menu-names="activeSubMenuNames"
    @select="handleSelect"
  >
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu
        :item="item"
        :parent="true"
        :collapsed-show-title="collapsedShowTitle"
        :collapse="collapse"
      />
    </template>
  </Menu>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
  unref,
  watch,
} from 'vue';
import { useRouter } from 'vue-router';
import Menu from './components/Menu.vue';
import SimpleSubMenu from './SimpleSubMenu.vue';
import { useOpenKeys } from './useOpenKeys';
import type { MenuState } from './types';
import type { Menu as MenuType } from '/@/router/types';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { useDesign } from '/@/hooks/web/useDesign';
import { listenerRouteChange } from '/@/logics/mitt/routeChange';
import { propTypes } from '/@/utils/propTypes';
import { REDIRECT_NAME } from '/@/router/constant';
import { isFunction, isUrl } from '/@/utils/is';
import { URL_HASH_TAB, openWindow } from '/@/utils';

export default defineComponent({
  name: 'SimpleMenu',
  components: {
    Menu,
    SimpleSubMenu,
  },
  inheritAttrs: false,
  props: {
    items: {
      type: Array as PropType<MenuType[]>,
      default: () => [],
    },
    collapse: propTypes.bool,
    mixSider: propTypes.bool,
    theme: propTypes.string,
    accordion: propTypes.bool.def(true),
    collapsedShowTitle: propTypes.bool,
    beforeClickFn: {
      type: Function as PropType<(key: string) => Promise<boolean>>,
    },
    isSplitMenu: propTypes.bool,
  },
  emits: ['menuClick'],
  setup(props, { attrs, emit }) {
    const currentActiveMenu = ref('');
    const isClickGo = ref(false);

    const menuState = reactive<MenuState>({
      activeName: '',
      openNames: [],
      activeSubMenuNames: [],
    });

    const { currentRoute } = useRouter();
    const { prefixCls } = useDesign('simple-menu');
    const { items, accordion, mixSider, collapse } = toRefs(props);

    const { setOpenKeys, getOpenKeys } = useOpenKeys(
      menuState,
      items,
      accordion,
      mixSider,
      collapse
    );

    const getBindValues = computed(() => ({ ...attrs, ...props }));

    watch(
      () => props.collapse,
      (collapse) => {
        if (collapse) {
          menuState.openNames = [];
        } else {
          setOpenKeys(currentRoute.value.path);
        }
      },
      { immediate: true }
    );

    watch(
      () => props.items,
      () => {
        if (!props.isSplitMenu) {
          return;
        }
        setOpenKeys(currentRoute.value.path);
      },
      { flush: 'post' }
    );

    listenerRouteChange((route) => {
      if (route.name === REDIRECT_NAME) return;

      currentActiveMenu.value = route.meta?.currentActiveMenu as string;
      handleMenuChange(route);

      if (unref(currentActiveMenu)) {
        menuState.activeName = unref(currentActiveMenu);
        setOpenKeys(unref(currentActiveMenu));
      }
    });

    async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
      if (unref(isClickGo)) {
        isClickGo.value = false;
        return;
      }
      const path = (route || unref(currentRoute)).path;

      menuState.activeName = path;

      setOpenKeys(path);
    }

    async function handleSelect(key: string) {
      if (isUrl(key)) {
        // update-begin--author:sunjianlei---date:20220408---for: 【VUEN-656】配置外部网址打不开，原因是带了#号，需要替换一下
        const url = key.replace(URL_HASH_TAB, '#');
        openWindow(url);
        // openWindow(key);
        // update-begin--author:sunjianlei---date:20220408---for: 【VUEN-656】配置外部网址打不开，原因是带了#号，需要替换一下
        return;
      }
      const { beforeClickFn } = props;
      if (beforeClickFn && isFunction(beforeClickFn)) {
        const flag = await beforeClickFn(key);
        if (!flag) return;
      }

      emit('menuClick', key);

      isClickGo.value = true;
      setOpenKeys(key);
      menuState.activeName = key;
    }

    return {
      prefixCls,
      getBindValues,
      handleSelect,
      getOpenKeys,
      ...toRefs(menuState),
    };
  },
});
</script>
<style lang="less">
@import './index.less';
</style>
