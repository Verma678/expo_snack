export const componentData = {
  "ButtonComponent": `
import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const ButtonComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Button</Text>
      <LinearGradient
        style={{ width: 200, height: 100, borderRadius: 10 }}
        colors={['red', 'white', 'blue']}
      />
    </View>
  );
};

export default ButtonComponent;
`,
  "CardComponent": `
import React from "react";
import ButtonComponent from "./ButtonComponent";
import { View, Text } from "react-native";

const CardComponent = () => {
  return (
    <View>
      <Text>Card</Text>
      <ButtonComponent />
    </View>
  );
};

export default CardComponent;
`,
  "HeaderComponent": `
import React from "react";
import { StyleSheet } from "react-native";
const HeaderComponent = () => {
  return <div style={styles.wrap}>HeaderComponent</div>;
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "yellow",
  },
});

export default HeaderComponent;
`,
  };