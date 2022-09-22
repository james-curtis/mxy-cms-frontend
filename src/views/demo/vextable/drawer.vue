<template>
  <BasicDrawer
    v-bind="$attrs"
    show-footer
    :title="getTitle"
    width="500px"
    @register="registerDrawer"
    @ok="handleSubmit"
  />
</template>
<script lang="ts">
import { computed, defineComponent, ref, unref } from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

export default defineComponent({
  name: 'TableDrawer',
  components: { BasicDrawer },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(
      async (data) => {
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
      }
    );

    const getTitle = computed(() =>
      !unref(isUpdate) ? '新增角色' : '编辑角色'
    );

    async function handleSubmit() {
      try {
        setDrawerProps({ confirmLoading: true });
        closeDrawer();
        emit('success');
      } finally {
        setDrawerProps({ confirmLoading: false });
      }
    }

    return {
      registerDrawer,
      getTitle,
      handleSubmit,
    };
  },
});
</script>
