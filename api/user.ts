import request from "@/utils/request";
import AppConf from "@/settings";
import { upload } from "@/utils/upload";

export const reqLoginPassword = (profile: LoginFormPassword): Promise<ResponseData<LoginResponse>> => {
  return request.post(AppConf.API.PasswordLogin, profile);
};
export const reqLoginEmail = (profile: LoginFormEmail): Promise<ResponseData<LoginResponse>> => {
  return request.post(AppConf.API.EmailLogin, profile);
};
export const reqSendCode = (email: string): Promise<ResponseData<object>> => {
  return request.post(AppConf.API.SendCode + `?email=${email}`);
};
export const reqRegister = (profile: LoginFormPassword & LoginFormEmail): Promise<ResponseData<object>> => {
  const formData = new FormData();
  formData.append("username", profile.username);
  formData.append("password", profile.password);
  formData.append("email", profile.email);
  formData.append("code", profile.code);
  return upload(AppConf.API.Register, formData);
};
export const reqUpdateAvtar = (avatar: RNFile | Blob): Promise<ResponseData<LoginResponse>> => {
  const formData = new FormData();
  console.log(avatar);
  formData.append("picture", avatar as Blob, (avatar as RNFile).name || "avatar.jpg");
  return upload(
    AppConf.API.UpdateAvatar,
    formData
  );
};
