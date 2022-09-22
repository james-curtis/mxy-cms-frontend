import type { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import type { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params
  );
}
/**
 * @description: Upload interface
 */
export function uploadImg(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: `${uploadUrl}/sys/common/upload`,
      onUploadProgress,
    },
    params,
    { isReturnResponse: true }
  );
}
