import React from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";

const html = `
  <h1>This HTML snippet is now rendered with native components !</h1>
  <h2>Enjoy a webview-free and blazing fast application</h2>
  <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

export default function Home() {
  const { width } = useWindowDimensions();
  return (
    <ScrollView style={{ flex: 1 }}>
      <RenderHTML contentWidth={width} source={{ html }} />
    </ScrollView>
  );
}
