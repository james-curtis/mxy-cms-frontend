<template>
  <Form
    ref="formRef"
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
  >
    <FormItem name="mobile" class="enter-x">
      <Input
        v-model:value="formData.mobile"
        size="large"
        :placeholder="t('sys.login.mobile')"
      />
    </FormItem>
    <FormItem name="sms" class="enter-x">
      <CountdownInput
        v-model:value="formData.sms"
        size="large"
        :placeholder="t('sys.login.smsCode')"
        :send-code-api="sendCodeApi"
      />
    </FormItem>
    <FormItem class="enter-x">
      <Button
        type="primary"
        size="large"
        block
        :loading="loading"
        @click="handleNext"
      >
        下一步
      </Button>
      <Button size="large" block class="mt-4" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </FormItem>
  </Form>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRaw, unref } from 'vue';

import { Button, Form, Input, steps } from 'ant-design-vue';
import { CountdownInput } from '/@/components/CountDown';

import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import {
  LoginStateEnum,
  SmsEnum,
  useFormRules,
  useFormValid,
  useLoginState,
} from '../login/useLogin';
import { getCaptcha, phoneVerify } from '/@/api/sys/user';

export default defineComponent({
  name: 'Step1',
  components: {
    Button,
    Form,
    FormItem: Form.Item,
    Input,
    CountdownInput,
  },
  emits: ['nextStep'],
  setup(_, { emit }) {
    const { t } = useI18n();
    const { handleBackLogin } = useLoginState();
    const { notification } = useMessage();

    const formRef = ref();
    const { validForm } = useFormValid(formRef);
    const { getFormRules } = useFormRules();

    const loading = ref(false);
    const formData = reactive({
      mobile: '',
      sms: '',
    });

    /**
     * 下一步
     */
    async function handleNext() {
      const data = await validForm();
      if (!data) return;
      const resultInfo = await phoneVerify(
        toRaw({
          phone: data.mobile,
          smscode: data.sms,
        })
      );
      if (resultInfo.success) {
        const accountInfo = {
          username: resultInfo.result.username,
          phone: data.mobile,
          smscode: resultInfo.result.smscode,
        };
        emit('nextStep', accountInfo);
      } else {
        notification.error({
          message: t('sys.api.errorTip'),
          description: resultInfo.message || t('sys.api.networkExceptionMsg'),
          duration: 3,
        });
      }
    }
    //倒计时执行前的函数
    function sendCodeApi() {
      return getCaptcha({
        mobile: formData.mobile,
        smsmode: SmsEnum.FORGET_PASSWORD,
      });
    }
    return {
      t,
      formRef,
      formData,
      getFormRules,
      handleNext,
      loading,
      handleBackLogin,
      sendCodeApi,
    };
  },
});
</script>
