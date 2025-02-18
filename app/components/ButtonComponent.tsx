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
