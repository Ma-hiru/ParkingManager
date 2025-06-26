import { FC } from "react";
import { View } from "react-native";
import { Updater } from "use-immer";
import ImgItem from "@/components/Feedback/ImgItem";

interface props {
  feedbackInfo: { feedbackImg: any },
  setFeedbackInfo: Updater<{
    taskId: number
    feedback: string
    feedbackImg: string[]
  }>;
}

const ImgUploader: FC<props> = ({ feedbackInfo, setFeedbackInfo }) => {
  const RenderExistImg = () => {
    return feedbackInfo.feedbackImg.map((item: any, index: any) =>
      <ImgItem key={index} source={item} setFeedbackInfo={setFeedbackInfo} />
    );
  };
  return (
    <>
      <View className="w-full flex-row justify-start items-center" style={{ flexWrap: "wrap" }}>
        {RenderExistImg()}
        <ImgItem setFeedbackInfo={setFeedbackInfo} />
      </View>
    </>
  );
};
export default ImgUploader;

