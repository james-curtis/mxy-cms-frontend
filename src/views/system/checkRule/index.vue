<template>
  <div :class="prefixCls">
    <BasicTable :row-selection="rowSelection" @register="registerTable">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button
          pre-icon="ant-design:plus-outlined"
          type="primary"
          @click="handleAdd"
        >
          新增
        </a-button>
        <a-button
          type="primary"
          pre-icon="ant-design:export-outlined"
          @click="onExportXls"
        >
          导出
        </a-button>
        <j-upload-button
          type="primary"
          pre-icon="ant-design:import-outlined"
          @click="onImportXls"
        >
          导入
        </j-upload-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined" />
                <span>删除</span>
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>
            <span>批量操作</span>
            <Icon icon="mdi:chevron-down" />
          </a-button>
        </a-dropdown>
      </template>

      <!--操作栏-->
      <template #action="{ record }">
        <TableAction
          :actions="getTableAction(record)"
          :drop-down-actions="getDropDownAction(record)"
        />
      </template>
    </BasicTable>

    <CheckRuleTestModal @register="testModal" />
    <CheckRuleModal @register="registerModal" @success="reload" />
  </div>
</template>

<script name="system-fillrule" lang="ts" setup>
import type { ActionItem } from '/@/components/Table';
import { BasicTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';

import { useModal } from '/@/components/Modal';
import {
  batchDeleteCheckRule,
  deleteCheckRule,
  exportUrl,
  getCheckRuleList,
  importUrl,
  validateCheckRule,
} from '/@/views/system/checkRule/check.rule.api';
import {
  columns,
  searchFormSchema,
} from '/@/views/system/checkRule/check.rule.data';

import CheckRuleTestModal from '/@/views/system/checkRule/CheckRuleTestModal.vue';

import CheckRuleModal from '/@/views/system/checkRule/CheckRuleModal.vue';
const [testModal, { openModal: openTestModal }] = useModal();
const [registerModal, { openModal }] = useModal();

// 列表页面公共参数、方法
const {
  prefixCls,
  tableContext,
  createMessage,
  onExportXls,
  onImportXls,
  createSuccessModal,
} = useListPage({
  designScope: 'check-rule',
  tableProps: {
    title: '编码校验规则管理页面',
    api: getCheckRuleList,
    columns,
    showIndexColumn: true,
    formConfig: {
      schemas: searchFormSchema,
    },
  },
  exportConfig: {
    url: exportUrl,
    name: '编码校验规则列表',
  },
  importConfig: {
    url: importUrl,
    success: () => reload(),
  },
});
// 注册 ListTable
const [registerTable, { reload }, { rowSelection, selectedRowKeys }] =
  tableContext;

/**
 * 新增事件
 */
function handleAdd() {
  openModal(true, {
    isUpdate: false,
  });
}

/**
 * 编辑事件
 */
function handleEdit(record) {
  console.log('record....', record);
  openModal(true, {
    record,
    isUpdate: true,
  });
}

/**
 * 删除事件
 */
async function handleDelete(record) {
  console.log(12345, record);
  await deleteCheckRule({ id: record.id }, reload);
}

/**
 * 批量删除事件
 */
async function batchHandleDelete() {
  await batchDeleteCheckRule({ ids: selectedRowKeys.value }, () => {
    selectedRowKeys.value = [];
    reload();
  });
}

/**
 * 功能测试
 */
function testRule(record) {
  openTestModal(true, { ruleCode: record.ruleCode });
}

/**
 * 编辑
 */
function getTableAction(record): ActionItem[] {
  return [{ label: '编辑', onClick: handleEdit.bind(null, record) }];
}

/**
 * 下拉操作栏
 */
function getDropDownAction(record): ActionItem[] {
  return [
    { label: '功能测试', onClick: testRule.bind(null, record) },
    {
      label: '删除',
      color: 'error',
      popConfirm: {
        title: '确认要删除吗？',
        confirm: handleDelete.bind(null, record),
      },
    },
  ];
}
</script>
