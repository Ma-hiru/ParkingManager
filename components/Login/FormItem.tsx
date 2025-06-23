import { FC, memo, useCallback, useMemo, useState } from "react";
import {
  FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText,
  FormControlHelper, FormControlHelperText,
  FormControlLabel,
  FormControlLabelText
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Icon, LockIcon } from "@/components/ui/icon";
import AppConf from "@/settings";


interface props {
  value: string;
  onChangeText: (text: string) => void;
  valid: boolean;
  type?: "text" | "password";
  placeholder?: string;
  tipsText?: string;
  errorText?: string;
  label?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  top?: number;
}

const FormItem: FC<props> = (
  {
    value,
    onChangeText,
    valid,
    type = "text",
    placeholder = "",
    errorText = "",
    tipsText = "",
    label = "",
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    top = 0
  }) => {
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleState = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);
  const InputType = useMemo(() => {
    if (type === "password") {
      if (showPassword) {
        return "text";
      } else {
        return "password";
      }
    }
    return type;
  }, [showPassword, type]);
  const borderColor = useMemo(() => {
    if (valid) {
      if (focus) {
        return AppConf.Theme.ThemeColor;
      } else {
        return "#999";
      }
    }
    return undefined;
  }, [focus, valid]);
  const formControlStyle = useMemo(() => ({
    marginTop: top
  }), [top]);
  return (
    <>
      <FormControl
        isInvalid={!valid}
        size="md"
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        style={formControlStyle}
      >
        {
          label &&
          <FormControlLabel>
            <FormControlLabelText>{label}</FormControlLabelText>
          </FormControlLabel>
        }
        <Input className="my-1 border-solid " size={"md"}
               style={{
                 borderColor: borderColor,
                 borderStyle: "solid"
               }}>
          <InputField
            type={InputType}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
          />
          {
            type === "password" &&
            <InputSlot style={{ paddingRight: 12 }} onPress={handleState}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          }
        </Input>
        {
          tipsText &&
          <FormControlHelper>
            <FormControlHelperText>
              {tipsText}
            </FormControlHelperText>
          </FormControlHelper>
        }
        {
          errorText &&
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {errorText}
            </FormControlErrorText>
          </FormControlError>
        }
      </FormControl>
    </>
  );
};
export default memo(FormItem);
