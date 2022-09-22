<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form
      ref="formRef"
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
    >
      <FormItem name="account" class="enter-x">
        <Input
          v-model:value="formData.account"
          class="fix-auto-fill"
          size="large"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>
      <FormItem name="mobile" class="enter-x">
        <Input
          v-model:value="formData.mobile"
          size="large"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          v-model:value="formData.sms"
          size="large"
          class="fix-auto-fill"
          :placeholder="t('sys.login.smsCode')"
          :send-code-api="sendCodeApi"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <StrengthMeter
          v-model:value="formData.password"
          size="large"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          v-model:value="formData.confirmPassword"
          size="large"
          visibility-toggle
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        :loading="loading"
        @click="handleRegister"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, toRaw, unref } from 'vue';
import LoginFormTitle from './LoginFormTitle.vue';
import { Button, Checkbox, Form, Input } from 'ant-design-vue';
import { StrengthMeter } from '/@/components/StrengthMeter';
import { CountdownInput } from '/@/components/CountDown';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import {
  LoginStateEnum,
  SmsEnum,
  useFormRules,
  useFormValid,
  useLoginState,
} from './useLogin';
import { getCaptcha, register } from '/@/api/sys/user';

const FormItem = Form.Item;
const InputPassword = Input.Password;
const { t } = useI18n();
const { handleBackLogin, getLoginState } = useLoginState();
const { notification, createErrorModal } = useMessage();
const formRef = ref();
const loading = ref(false);
const formData = reactive({
  account: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  sms: '',
  policy: false,
});
const { getFormRules } = useFormRules(formData);
const { validForm } = useFormValid(formRef);
const getShow = computed(
  () => unref(getLoginState) === LoginStateEnum.REGISTER
);

/**
 * 注册
 */
async function handleRegister() {
  const data = await validForm();
  if (!data) return;
  try {
    loading.value = true;
    const resultInfo = await register(
      toRaw({
        username: data.account,
        password: data.password,
        phone: data.mobile,
        smscode: data.sms,
      })
    );
    if (resultInfo && resultInfo.data.success) {
      notification.success({
        description: resultInfo.data.message || t('sys.api.registerMsg'),
        duration: 3,
      });
      handleBackLogin();
    } else {
      notification.warning({
        message: t('sys.api.errorTip'),
        description:
          resultInfo.data.message || t('sys.api.networkExceptionMsg'),
        duration: 3,
      });
    }
  } catch (error) {
    notification.error({
      message: t('sys.api.errorTip'),
      description: error.message || t('sys.api.networkExceptionMsg'),
      duration: 3,
    });
  } finally {
    loading.value = false;
  }
}

//发送验证码的函数
function sendCodeApi() {
  return getCaptcha({ mobile: formData.mobile, smsmode: SmsEnum.REGISTER });
}
</script>
