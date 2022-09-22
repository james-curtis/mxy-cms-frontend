<template>
  <BasicTable
    :search-info="searchInfo"
    :columns="logColumns"
    @register="registerTable"
  >
    <template #tableTitle>
      <a-tabs default-active-key="1" size="small" @change="tabChange">
        <a-tab-pane key="1" tab="登录日志" />
        <a-tab-pane key="2" tab="操作日志" />
      </a-tabs>
    </template>
    <template #expandedRowRender="{ record }">
      <div v-if="searchInfo.logType == 2">
        <div style="margin-bottom: 5px">
          <a-badge status="success" style="vertical-align: middle" />
          <span style="vertical-align: middle"
            >请求方法:{{ record.method }}</span
          >
        </div>
        <div>
          <a-badge status="processing" style="vertical-align: middle" />
          <span style="vertical-align: middle"
            >请求参数:{{ record.requestParam }}</span
          >
        </div>
      </div>
    </template>
  </BasicTable>
</template>
<script lang="ts" name="monitor-log" setup>
import { ref } from 'vue';
import { BasicTable, TableAction, useTable } from '/@/components/Table';
import { getLogList } from './log.api';
import { columns, operationLogColumn, searchFormSchema } from './log.data';
import { useMessage } from '/@/hooks/web/useMessage';
import { useListPage } from '/@/hooks/system/useListPage';
const { createMessage } = useMessage();
const checkedKeys = ref<Array<string | number>>([]);

const logColumns = ref<any>(columns);
const searchInfo = { logType: '1' };
// 列表页面公共参数、方法
const { prefixCls, tableContext } = useListPage({
  designScope: 'user-list',
  tableProps: {
    title: '日志列表',
    api: getLogList,
    expandRowByClick: true,
    showActionColumn: false,
    rowSelection: {
      columnWidth: 20,
    },
    formConfig: {
      schemas: searchFormSchema,
      fieldMapToTime: [
        ['fieldTime', ['createTime_begin', 'createTime_end'], 'YYYY-MM-DD'],
      ],
    },
  },
});

const [registerTable, { reload }] = tableContext;

// 日志类型
function tabChange(key) {
  searchInfo.logType = key;
  //update-begin---author:wangshuai ---date:20220506  for：[VUEN-943]vue3日志管理列表翻译不对------------
  if (key == '1') {
    logColumns.value = columns;
  } else {
    logColumns.value = operationLogColumn;
  }
  //update-end---author:wangshuai ---date:20220506  for：[VUEN-943]vue3日志管理列表翻译不对--------------
  reload();
}

/**
 * 选择事件
 */
function onSelectChange(selectedRowKeys: (string | number)[]) {
  checkedKeys.value = selectedRowKeys;
}
</script>
