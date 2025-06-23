import { useRouter } from "expo-router";

/** 路由鉴权 */
const permissionCheckFunc: PermissionCheckFunc[] = [];

const execCheckFunc: PermissionCheckFunc = (path, push): boolean => {
  return permissionCheckFunc.every((func) => func(path, push));
};

export const AddRouterPermissionFunc = (checkFunc: PermissionCheckFunc) => {
  permissionCheckFunc.push(checkFunc);
};

/** 路由封装 */
export const goToPages =
  <T extends Mode>(
    router: ReturnType<typeof useRouter>,
    path: RouterPath,
    mode: T
  ): IfReturnFn<T, "FN"> => {
    switch (mode) {
      case "FN":
        return (() => {
          if (execCheckFunc(path, router.push)) {
            router.push(path as PurePath);
          }
        }) as IfReturnFn<T, "FN">;
      case "MOVE":
        if (execCheckFunc(path, router.push)) {
          router.push(path as PurePath);
        }
    }
    return undefined as IfReturnFn<T, "FN">;
  };

/** 类型 */
type Mode = "FN" | "MOVE";

type IfReturnFn<T, U extends Mode> = T extends U ? () => void : undefined;

type PurePath = Parameters<ReturnType<typeof useRouter>["push"]>[0];

type RouterPath =
  | PurePath
  | { pathname: PurePath | string; params: object; }

type Push = ReturnType<typeof useRouter> ["push"];

type PermissionCheckFunc = (path: RouterPath, push: Push) => boolean;
