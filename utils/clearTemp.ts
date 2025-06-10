import { fileSystem } from "@/utils/fileSystem";
import { Log } from "@/utils/logger";
import AppConf from "@/settings";


export const tempClear = async (): Promise<boolean> => {
  if (fileSystem.cacheDirectory === null) return false;
  try {
    await delDir(fileSystem.cacheDirectory + AppConf.CACHE_DIR + "/");
    return true;
  } catch (err) {
    Log.Echo({ err });
    return false;
  }
};
export const tempSize = async () => {
  if (fileSystem.cacheDirectory === null) return -1;
  try {
    return await getDirSize(fileSystem.cacheDirectory + AppConf.CACHE_DIR + "/");
  } catch (err) {
    Log.Echo({ err });
    return -1;
  }
};
const delDir = async (dir: string) => {
  const files = await fileSystem.readDirectoryAsync(dir);
  for (const file of files) {
    const fileInfo = await fileSystem.getInfoAsync(dir + file);
    if (fileInfo.exists) {
      if (fileInfo.isDirectory) {
        await delDir(dir + file);
      } else {
        await fileSystem.RemoveFile(dir + file);
      }
    }
  }
};
const getDirSize = async (dir: string) => {
  let totalSize = 0;
  const files = await fileSystem.readDirectoryAsync(dir);
  for (const file of files) {
    const fileInfo = await fileSystem.getInfoAsync(dir + file);
    if (fileInfo.exists) {
      if (fileInfo.isDirectory) {
        totalSize += await getDirSize(dir + file);
      } else {
        totalSize += fileInfo.size;
      }
    }
  }
  return totalSize;
};
