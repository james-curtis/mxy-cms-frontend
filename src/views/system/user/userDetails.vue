<template>
  <Description class="mt-4" @register="register" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { DescItem } from '/@/components/Description/index';
import { Description, useDescription } from '/@/components/Description/index';
const mockData = {
  username: 'test',
  nickName: 'VB',
  age: '123',
  phone: '15695909xxx',
  email: '190848757@qq.com',
  addr: '厦门市思明区',
  sex: '男',
  certy: '3504256199xxxxxxxxx',
  tag: 'orange',
};
const schema: DescItem[] = [
  {
    field: 'username',
    label: '用户名',
  },
  {
    field: 'nickName',
    label: '昵称',
    render: (curVal, data) => {
      return `${data.username}-${curVal}`;
    },
  },
  {
    field: 'phone',
    label: '联系电话',
  },
  {
    field: 'email',
    label: '邮箱',
  },
  {
    field: 'addr',
    label: '地址',
  },
];
export default defineComponent({
  components: { Description },
  setup() {
    const [register] = useDescription({
      title: 'useDescription',
      data: mockData,
      schema,
    });
    return { mockData, schema, register };
  },
});
</script>
