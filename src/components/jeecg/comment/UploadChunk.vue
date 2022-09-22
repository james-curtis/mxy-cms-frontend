<template>
  <div v-if="visible">
    <a-alert type="info" class="jeecg-comment-files" style="margin: 0">
      <template #message>
        <span class="j-icon">
          <a-upload
            v-model:file-list="selectFileList"
            multiple
            :show-upload-list="false"
            :before-upload="beforeUpload"
          >
            <span class="inner-button"><upload-outlined />上传</span>
          </a-upload>
        </span>
        <span class="j-icon">
          <span class="inner-button"><folder-outlined />从文件库选择?</span>
        </span>
      </template>
    </a-alert>

    <!-- 正在上传的文件 -->
    <div
      v-if="selectFileList && selectFileList.length > 0"
      class="selected-file-warp"
    >
      <div class="selected-file-list">
        <div v-for="item in selectFileList" class="item">
          <div class="complex">
            <div class="content">
              <!-- 图片 -->
              <div
                v-if="isImage(item)"
                class="content-top"
                style="height: 100%"
              >
                <div
                  class="content-image"
                  :style="{
                    height: '100%',
                    backgroundImage: 'url(' + getImageSrc(item) + ')',
                  }"
                >
                  <!--  <img style="height: 100%;" :src="getImageSrc(item)">-->
                </div>
              </div>
              <!-- 文件 -->
              <template v-else>
                <div class="content-top">
                  <div
                    class="content-icon"
                    :style="{
                      background: 'url(' + getBackground(item) + ')  no-repeat',
                    }"
                  />
                </div>
                <div class="content-bottom" :title="item.name">
                  <span>{{ item.name }}</span>
                </div>
              </template>
            </div>
            <div class="layer" :class="{ 'layer-image': isImage(item) }">
              <div class="next" @click="viewImage(item)">
                <div class="text">
                  {{ item.name }}
                </div>
              </div>
              <div class="buttons">
                <div class="opt-icon">
                  <Tooltip title="删除">
                    <delete-outlined @click="handleRemove(item)" />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item empty" />
        <div class="item empty" />
        <div class="item empty" />
        <div class="item empty" />
        <div class="item empty" />
        <div class="item empty" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRaw, watch } from 'vue';
import { Tooltip } from 'ant-design-vue';
import {
  DeleteOutlined,
  DownloadOutlined,
  FolderOutlined,
  PaperClipOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';
import { useFileList } from './useComment';
export default {
  name: 'UploadChunk',
  components: {
    Tooltip,
    UploadOutlined,
    FolderOutlined,
    DownloadOutlined,
    PaperClipOutlined,
    DeleteOutlined,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select'],
  setup(_p, { emit }) {
    const {
      selectFileList,
      beforeUpload,
      handleRemove,
      getBackground,
      isImage,
      getImageSrc,
      viewImage,
    } = useFileList();

    function getUploadFileList() {
      const list = toRaw(selectFileList.value);
      console.log(list);
      return list;
    }

    function clear() {
      selectFileList.value = [];
    }

    watch(
      () => selectFileList.value,
      (arr) => {
        if (arr && arr.length > 0) {
          const name = arr[0].name;
          if (name) {
            emit('select', name);
          }
        }
      }
    );

    return {
      selectFileList,
      beforeUpload,
      handleRemove,
      getBackground,
      getUploadFileList,
      clear,
      isImage,
      getImageSrc,
      viewImage,
    };
  },
};
</script>

<style lang="less" scoped>
@import 'comment.less';
</style>
