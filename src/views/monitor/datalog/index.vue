<template>
  <div>
    <BasicTable :row-selection="rowSelection" @register="registerTable">
      <template #tableTitle>
        <a-button
          pre-icon="ant-design:plus-outlined"
          type="primary"
          style="margin-right: 5px"
          @click="handleCompare"
        >
          数据比较
        </a-button>
      </template>
    </BasicTable>
    <DataLogCompareModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" name="monitor-datalog" setup>
import { ref } from 'vue';
import { BasicTable, TableAction } from '/@/components/Table';
import DataLogCompareModal from './DataLogCompareModal.vue';
import { getDataLogList } from './datalog.api';
import { columns, searchFormSchema } from './datalog.data';
import { useMessage } from '/@/hooks/web/useMessage';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
const [registerModal, { openModal }] = useModal();
const { createMessage } = useMessage();
const checkedRows = ref<Array<object | number>>([]);

// 列表页面公共参数、方法
const { prefixCls, tableContext } = useListPage({
  designScope: 'datalog-template',
  tableProps: {
    title: '数据日志列表',
    api: getDataLogList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    actionColumn: false,
  },
});

const [
  registerTable,
  { reload },
  { rowSelection, selectedRowKeys, selectedRows },
] = tableContext;

function handleCompare() {
  const obj = selectedRows.value;
  console.info('sfsfsf', obj);
  if (!obj || obj.length != 2) {
    createMessage.warning('请选择两条数据!');
    return false;
  }
  if (obj[0].dataId != obj[1].dataId) {
    createMessage.warning('请选择相同的数据库表和数据ID进行比较!');
    return false;
  }
  openModal(true, {
    selectedRows,
    isUpdate: true,
  });
}
</script>
