import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { componentData } from "../componentData";

const componentArray = Object.entries(componentData).map(([name, code]) => ({
  name,
  code,
}));

export default function Component({ onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.sidebar}>
      <FlatList
        data={componentArray}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const isSelected = item.name === selected;

          return (
            <TouchableOpacity
              onPress={() => {
                setSelected(item.name);
                onSelect(item.code, item.name);
              }}
              style={[styles.item, isSelected && styles.selectedItem]}
            >
              <Text style={[styles.itemText, isSelected && styles.selectedText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 180,
    backgroundColor: "#2C2C2C",
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  item: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: "#3A3A3A",
    alignItems: "center",
  },
  itemText: {
    color: "#FFF",
    fontSize: 14,
  },
  selectedItem: {
    backgroundColor: "#5A5A5A",
  },
  selectedText: {
    fontWeight: "bold",
    color: "#FFD700",
  },
});

