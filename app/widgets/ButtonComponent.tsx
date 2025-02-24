// import React from "react";
// import { View, Text } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Image } from "react-native";

// const ButtonComponent = ({text}) => {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Button</Text>
//       <LinearGradient
//         style={{ width: 200, height: 100, borderRadius: 10 }}
//         colors={["red", "white", "blue"]}
//       />
//       <Text>{text}</Text>
//       {/* <Image
//         source={{
//           uri: componentData["favicon.png"],
//         }}
//         style={{ width: 200, height: 200, borderWidth: 3 }}
//       /> */}
//     </View>
//   );
// };

// export default ButtonComponent;


import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; 

const ButtonComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Button</Text>
      <LinearGradient
        style={{ width: 200, height: 100, borderRadius: 10 }}
        colors={["red", "white", "blue"]}
      />
      <Image
        source={{uri: require("@/assets/images/adaptive_icon.png")}} 
        style={{ width: 200, height: 200, borderWidth: 3 }}
      />
    </View>
  );
};

export default ButtonComponent;
