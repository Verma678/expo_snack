import { Image, StyleSheet } from "react-native";
import SnackPlayer from "./SnackPlayer";

export default function HomeScreen() {
  return (
    <SnackPlayer/>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
