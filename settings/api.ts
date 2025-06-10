import localStore from "@/utils/localStore";

/** baseURL */
const WEATHER_URL = "https://shiina-mahiru.cn/weatherIcon";
export const DEFAULT_BASE_URL = "https://abc.renmen321.cn:23451";
export let baseUrl = DEFAULT_BASE_URL;
localStore.getItem("baseUrl").then((data) => {
  if (data !== "") {
    baseUrl = data;
  } else {
    localStore.setItem("baseUrl", DEFAULT_BASE_URL).then();
  }
});
export const ChangeAppBaseUrl = async (url: string) => {
  baseUrl = url;
  await localStore.setItem("baseUrl", url);
};
export enum tokenTypePrefix {
  /** Basic */
  Basic = "Basic ",
  /** Bearer */
  Bearer = "Bearer ",
  /** NonePrefix */
  None = ""
}
export const tokenPrefix = tokenTypePrefix.None;
export const enum API {

}
export const GetWeatherIconUrl = (iconIndex: string | null | undefined, style: "fill" | "line", color: "white" | "black", defaultIcon: number) => {
  const prefix = WEATHER_URL + `/${color}/`;
  const suffix = `${style === "fill" ? "-fill" : ""}.svg`;
  const defaultUrl = prefix + defaultIcon + suffix;
  if (iconIndex === null || iconIndex === undefined) {
    return defaultUrl;
  }
  const id = Number(iconIndex);
  if (Number.isNaN(id)) {
    return defaultUrl;
  }
  return prefix + id + suffix;
};
