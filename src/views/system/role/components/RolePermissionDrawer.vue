<template>
  <BasicDrawer
    v-bind="$attrs"
    title="角色权限配置"
    width="650px"
    destroy-on-close
    show-footer
    @register="registerDrawer"
  >
    <BasicTree
      ref="treeRef"
      checkable
      toolbar
      :tree-data="treeData"
      :checked-keys="checkedKeys"
      :expanded-keys="allTreeKeys"
      :selected-keys="selectedKeys"
      :check-strictly="true"
      :click-row-to-expand="false"
      title="所拥有的的权限"
      @check="onCheck"
      @select="onTreeNodeSelect"
    >
      <template #title="{ slotTitle, ruleFlag }">
        {{ slotTitle }}
        <Icon
          v-if="ruleFlag"
          icon="ant-design:align-left-outlined"
          style="margin-left: 5px; color: red"
        />
      </template>
    </BasicTree>
    <!--右下角按钮-->
    <template #footer>
      <PopConfirmButton
        title="确定放弃编辑？"
        ok-text="确定"
        cancel-text="取消"
        @confirm="closeDrawer"
      >
        取消
      </PopConfirmButton>
      <a-button
        type="primary"
        :loading="loading"
        ghost
        style="margin-right: 0.8rem"
        @click="handleSubmit(false)"
      >
        仅保存
      </a-button>
      <a-button type="primary" :loading="loading" @click="handleSubmit(true)">
        保存并关闭
      </a-button>
    </template>
    <RoleDataRuleDrawer @register="registerDrawer1" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, unref } from 'vue';
import { BasicDrawer, useDrawer, useDrawerInner } from '/src/components/Drawer';
import { BasicTree } from '/src/components/Tree';
import { PopConfirmButton } from '/@/components/Button';
import {
  queryRolePermission,
  queryTreeListForRole,
  saveRolePermission,
} from '../role.api';
import RoleDataRuleDrawer from './RoleDataRuleDrawer.vue';
import type { TreeItem } from '/src/components/Tree';
const emit = defineEmits(['register']);
//树的信息
const treeData = ref<TreeItem[]>([]);
//树的全部节点信息
const allTreeKeys = ref([]);
//树的选择节点信息
const checkedKeys = ref([]);
const defaultCheckedKeys = ref([]);
//树的选中的节点信息
const selectedKeys = ref([]);
const roleId = ref('');
//树的实例
const treeRef = ref(null);
const loading = ref(false);

const [registerDrawer1, { openDrawer: openDataRuleDrawer }] = useDrawer();
const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(
  async (data) => {
    await reset();
    setDrawerProps({ confirmLoading: false, loading: true });
    roleId.value = data.roleId;
    //初始化数据
    const roleResult = await queryTreeListForRole();
    treeData.value = roleResult.treeList;
    allTreeKeys.value = roleResult.ids;
    //初始化角色菜单数据
    const permResult = await queryRolePermission({ roleId: unref(roleId) });
    checkedKeys.value = permResult;
    defaultCheckedKeys.value = permResult;
    setDrawerProps({ loading: false });
  }
);
/**
 * 点击选中
 */
function onCheck(o) {
  checkedKeys.value = o.checked ? o.checked : o;
}
/**
 * 选中节点，打开数据权限抽屉
 */
function onTreeNodeSelect(key) {
  if (key && key.length > 0) {
    selectedKeys.value = key;
  }
  openDataRuleDrawer(true, {
    functionId: unref(selectedKeys)[0],
    roleId: unref(roleId),
  });
}
/**
 * 数据重置
 */
function reset() {
  treeData.value = [];
  allTreeKeys.value = [];
  checkedKeys.value = [];
  defaultCheckedKeys.value = [];
  selectedKeys.value = [];
  roleId.value = '';
}
/**
 * 获取tree实例
 */
function getTree() {
  const tree = unref(treeRef);
  if (!tree) {
    throw new Error('tree is null!');
  }
  return tree;
}
/**
 * 提交
 */
async function handleSubmit(exit) {
  const params = {
    roleId: unref(roleId),
    permissionIds: unref(getTree().getCheckedKeys()).join(','),
    lastpermissionIds: unref(defaultCheckedKeys).join(','),
  };
  loading.value = true;
  await saveRolePermission(params);
  loading.value = false;
  exit && closeDrawer();
}
</script>

<style lang="less" scoped>
/** 固定操作按钮 */
.jeecg-basic-tree {
  position: absolute;
  width: 618px;
}
</style>
