import { FC, memo } from "react";
import { StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import filterIcon from "@/assets/SearchParking/filter.svg";
import AppConf from "@/settings";
import { Menu, MenuItem, MenuItemLabel, MenuSeparator } from "@/components/ui/menu";
import {
  CheckIcon,
  Icon, MenuIcon
} from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import PressFeedback from "@/components/animate/PressFeedback";

interface props {
  onSelect?: (type: FilterMenu) => void;
  current: FilterMenu;
  title: string;
  menuData: FilterMenu[];
}


const Filter: FC<props> = (
  {
    onSelect,
    current,
    title,
    menuData
  }) => {
  return (
    <>
      <PressFeedback minScale={0.9} containerStyle={ContainerStyle}>
        {
          (
            _,
            handlePressIn,
            handlePressOut
          ) => {
            return (
              <Menu
                placement="top left"
                offset={30}
                trigger={
                  (triggerProps) => {
                    return (
                      <Button
                        {...triggerProps}
                        style={{ backgroundColor: "transparent" }}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                      >
                        <Image source={filterIcon} style={IconStyle} />
                      </Button>
                    );
                  }
                }>
                <MenuItem disabled key="header" textValue="none">
                  <Icon as={MenuIcon} size="sm" style={{ marginRight: 5 }} />
                  <Text>{title}</Text>
                </MenuItem>
                <MenuSeparator />
                {
                  menuData.map((Menu) => {
                    return (
                      <MenuItem
                        key={Menu.title}
                        textValue={Menu.title}
                        onPress={() => {
                          onSelect && onSelect(Menu);
                        }}
                        style={MenuItemStyle}
                      >
                        <MenuItemLabel size="sm">
                          {Menu.title}
                        </MenuItemLabel>
                        {
                          current.title === Menu.title && (
                            <Icon as={CheckIcon} size="sm" className="mr-2" />
                          )
                        }
                      </MenuItem>
                    );
                  })
                }
              </Menu>
            );
          }
        }
      </PressFeedback>
    </>
  );
};
export default memo(Filter);
const {
  ContainerStyle,
  IconStyle,
  MenuItemStyle
} = StyleSheet.create({
  ContainerStyle: {
    position: "absolute",
    bottom: 40,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppConf.Theme.ThemeColor
  },
  IconStyle: {
    width: 30,
    height: 30
  },
  MenuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
} as const);
