

// import React from "react";
// import { View, Text, Image } from "react-native";
// import { LinearGradient } from "expo-linear-gradient"; 

// const ButtonComponent = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Button</Text>
//       <LinearGradient
//         style={{ width: 200, height: 100, borderRadius: 10 }}
//         colors={["red", "white", "blue"]}
//       />
//     </View>
//   );
// };

// export default ButtonComponent;


import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ButtonComponent = ({ title, colors = ["#ff7e5f", "#feb47b"], imageUrl, onPress }) => {
  console.log(imageUrl)
  return (
    <TouchableOpacity onPress={onPress} style={{ marginBottom: 10 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <LinearGradient
          style={{
            width: 200,
            height: 50,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          colors={colors}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>{title}</Text>
        </LinearGradient>
        <Image source={{  uri: imageUrl[0]}} style={{ width: 50, height: 50, marginTop: 5 }}></Image>
      </View>
      
    </TouchableOpacity>
  );
};

export default ButtonComponent;

