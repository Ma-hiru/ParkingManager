import { FC, memo, useCallback, useState } from "react";
import Header from "@/components/Header";
import { View, Text, StyleSheet } from "react-native";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useImmer } from "use-immer";
import ImgUploader from "@/components/Feedback/ImgUploader";
import AppBtn from "@/components/AppBtn";

const Feedback: FC<object> = () => {
  const [feedbackInfo, setFeedbackInfo] = useImmer({
    taskId: 0,
    feedback: "",
    feedbackImg: [] as string[]
  });
  const [loading, setLoading] = useState(false);
  const submit = useCallback(() => {

  }, []);
  return (
    <>
      <Header title={"反馈"} />
      <View style={ContainerStyle}>
        <View>
          <Text style={{ marginBottom: 10 }}>文字信息（必须）</Text>
          <Textarea
            size="md"
            isReadOnly={false}
            isInvalid={false}
            isDisabled={false}
          >
            <TextareaInput
              placeholder="描述你的问题"
              value={feedbackInfo.feedback}
              onChangeText={text => setFeedbackInfo(draft => {
                draft.feedback = text;
              })}
            />
          </Textarea>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ marginBottom: 2 }}>上传图片（选填）</Text>
          <ImgUploader
            feedbackInfo={feedbackInfo}
            setFeedbackInfo={setFeedbackInfo}
            key={feedbackInfo.feedbackImg.length}
          />
        </View>
      </View>
      <View style={SubmitStyle}>
        <AppBtn loading={loading} onPress={submit}>提交</AppBtn>
      </View>
    </>
  );
};
export default memo(Feedback) as typeof Feedback;


const {
  ContainerStyle,
  SubmitStyle
} = StyleSheet.create({
  ContainerStyle: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff"
  },
  SubmitStyle: {
    position: "absolute",
    bottom: 40,
    width: "80%",
    left: "10%",
    alignItems: "center",
    justifyContent: "center"
  }
} as const);
