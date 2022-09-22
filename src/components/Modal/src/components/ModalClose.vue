<template>
  <div :class="getClass">
    <template v-if="fullScreenStatus">
      <Tooltip
        v-if="fullScreen"
        :title="t('component.modal.restore')"
        placement="bottom"
      >
        <FullscreenExitOutlined role="full" @click="handleFullScreen" />
      </Tooltip>
      <Tooltip v-else :title="t('component.modal.maximize')" placement="bottom">
        <FullscreenOutlined role="close" @click="handleFullScreen" />
      </Tooltip>
    </template>

    <!-- 是否开启评论区域 -->
    <template v-if="enableComment">
      <Tooltip v-if="commentSpan > 0" title="关闭" placement="bottom">
        <RightSquareOutlined
          style="font-size: 16px"
          @click="handleCloseComment"
        />
      </Tooltip>
      <Tooltip v-else title="展开" placement="bottom">
        <LeftSquareOutlined
          style="font-size: 16px"
          @click="handleOpenComment"
        />
      </Tooltip>
    </template>

    <Tooltip :title="t('component.modal.close')" placement="bottom">
      <CloseOutlined @click="handleCancel" />
    </Tooltip>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import {
  CloseOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LeftSquareOutlined,
  RightSquareOutlined,
} from '@ant-design/icons-vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { Tooltip } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n';

export default defineComponent({
  name: 'ModalClose',
  components: {
    Tooltip,
    FullscreenExitOutlined,
    FullscreenOutlined,
    CloseOutlined,
    LeftSquareOutlined,
    RightSquareOutlined,
  },
  props: {
    canFullscreen: { type: Boolean, default: true },
    fullScreen: { type: Boolean },
    enableComment: { type: Boolean, default: false },
    commentSpan: { type: Number, default: 0 },
  },
  emits: ['cancel', 'fullscreen', 'comment'],
  setup(props, { emit }) {
    const { prefixCls } = useDesign('basic-modal-close');
    const { t } = useI18n();

    const getClass = computed(() => {
      return [
        prefixCls,
        `${prefixCls}--custom`,
        {
          [`${prefixCls}--can-full`]: props.canFullscreen,
        },
      ];
    });

    function handleCancel(e: Event) {
      emit('cancel', e);
    }

    function handleFullScreen(e: Event) {
      e?.stopPropagation();
      e?.preventDefault();
      if (props.commentSpan == 0 || props.enableComment == false) {
        emit('fullscreen');
      }
    }

    /**
     * 开启评论区域
     * @param e
     */
    function handleOpenComment(e: Event) {
      e?.stopPropagation();
      e?.preventDefault();
      if (props.fullScreen == false) {
        emit('fullscreen');
      }
      emit('comment', true);
    }

    /**
     * 关闭评论区域
     * @param e
     */
    function handleCloseComment(e: Event) {
      e?.stopPropagation();
      e?.preventDefault();
      emit('comment', false);
    }

    /**
     * 有评论的时候不需要设置全屏
     */
    const fullScreenStatus = computed(() => {
      if (props.enableComment === true) {
        return false;
      } else {
        return props.canFullscreen;
      }
    });

    return {
      t,
      getClass,
      prefixCls,
      handleCancel,
      handleFullScreen,
      handleOpenComment,
      handleCloseComment,
      fullScreenStatus,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-basic-modal-close';
.@{prefix-cls} {
  display: flex;
  height: 95%;
  align-items: center;

  > span {
    margin-left: 48px;
    font-size: 16px;
  }

  &--can-full {
    > span {
      margin-left: 12px;
    }
  }

  &:not(&--can-full) {
    > span:nth-child(1) {
      &:hover {
        font-weight: 700;
      }
    }
  }

  & span:nth-child(1) {
    display: inline-block;
    padding: 10px;

    &:hover {
      color: @primary-color;
    }
  }

  & span:last-child {
    padding: 10px 10px 10px 0;
    &:hover {
      color: @error-color;
    }
  }
}
</style>
