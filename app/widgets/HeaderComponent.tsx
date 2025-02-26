import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Test from "@/app/(tabs)/Test";
const HeaderComponent = () => {
  return (
    <View style={styles.wrap}>
      <Text>Header</Text>
      <Test/>
    </View>
  )
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "yellow",
  },
});

export default HeaderComponent;
