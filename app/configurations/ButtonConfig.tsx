import React from "react";
import { View } from "react-native";
import ButtonComponent from "@/app/widgets/ButtonComponent";

    const BannerComponent = {
      
      withTimer: {
        title: "Start Timer",
        colors: ["green", "lightgreen"],
        imageUrl: ["https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"],
        props: {
          onPress: () => alert("Timer Started"),
        },
      },
      withoutTimer: {
        title: "Simple Button",
        colors: ["blue", "lightblue"],
        imageUrl: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s"],
        props: {
          onPress: () => alert("Simple Button Clicked"),
        },
      },
    };

    const ButtonRenderer = () => {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          
          {Object.entries(BannerComponent).map(([key, config]) => (
            <ButtonComponent key={key} title={config.title} colors={config.colors} imageUrl={config.imageUrl} {...config.props} />
          ))}
        </View>
      );
    };

    export default ButtonRenderer;

