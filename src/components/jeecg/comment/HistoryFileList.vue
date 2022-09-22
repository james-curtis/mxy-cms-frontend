<template>
  <div
    class="comment-file-his-list"
    :class="isComment === true ? 'in-comment' : ''"
  >
    <div class="selected-file-list">
      <div v-for="item in dataList" class="item">
        <div class="complex">
          <div class="content">
            <!-- 图片 -->
            <div v-if="isImage(item)" class="content-top" style="height: 100%">
              <div class="content-image" :style="getImageAsBackground(item)">
                <!--<img style="height: 100%;" :src="getImageSrc(item)"/>-->
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
              <div class="text">
                {{ getFileSize(item) }}
              </div>
            </div>
            <div class="buttons">
              <div class="opt-icon">
                <Tooltip title="下载">
                  <download-outlined @click="downLoad(item)" />
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
</template>

<script>
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
  name: 'HistoryFileList',
  components: {
    UploadOutlined,
    FolderOutlined,
    DownloadOutlined,
    PaperClipOutlined,
    DeleteOutlined,
    Tooltip,
  },
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    isComment: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const {
      getBackground,
      getFileSize,
      downLoad,
      isImage,
      getImageAsBackground,
      viewImage,
    } = useFileList();
    return {
      getBackground,
      downLoad,
      getFileSize,
      isImage,
      getImageAsBackground,
      viewImage,
    };
  },
};
</script>

<style lang="less" scoped>
@import 'comment.less';
</style>
