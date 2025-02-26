export const componentData = {
  "Component": `import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { componentData } from "@/app/componentData";

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

`,
  "SnackPlayer": `import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import useSnack from "@/app/(tabs)/useSnack";
import QRCode from "react-native-qrcode-svg";
import { componentData } from "@/app/componentData";
import Component from "@/app/(tabs)/Component";
import Editor from '@monaco-editor/react';

const data = Object.entries(componentData).map(([name, code]) => ({
  name,
  code,
}));

export default function SnackPlayer() {
  const [currentComponent, setCurrentComponent] = useState(data[0]);
  const [snack, snackState, updateCode, webPreviewRef, isClientReady] =
    useSnack(currentComponent.code);

  const [showQR, setShowQR] = useState(true); 

  useEffect(() => {
    updateCode(currentComponent.code);
  }, [currentComponent]);

  const { url, webPreviewURL } = snackState;
  const finalWebPreviewURL = webPreviewURL;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Component
          onSelect={(code, name) => setCurrentComponent({ name, code })}
        />

        <View style={styles.editorContainer}>
          <Text style={styles.title}>Editing: {currentComponent.name}</Text>
          <Editor
            height="100%"
            language="javascript"
            theme="vs-dark"
            value={currentComponent.code}
            onChange={(newCode) =>
              setCurrentComponent((prev) => ({ ...prev, code: newCode }))
            }
            options={{
              automaticLayout: true,
              minimap: { enabled: true, scale: 1.2, showSlider: "always" },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              fontSize: 14,
              fontFamily: "Fira Code, Menlo, Monaco, 'Courier New', monospace",
              cursorBlinking: "smooth",
              lineNumbers: "on",
              renderIndentGuides: true,
              overviewRulerBorder: false,
              folding: true,
              showFoldingControls: "always",
              quickSuggestions: true,
              suggestOnTriggerCharacters: true,
              matchBrackets: "always",
              bracketPairColorization: { enabled: true },
              autoClosingBrackets: "always",
              autoClosingQuotes: "always",
              renderLineHighlight: "all",
              selectionHighlight: true,
              occurrencesHighlight: true,
            }}
          />
        </View>

//         <View style={styles.rightContainer}>
//           <View style={styles.previewWrapper}>
//             {showQR ? (
              <View style={styles.qrWrapper}>
                {url ? (
                  <QRCode value={url} size={180} />
                ) : (
                  <Text style={styles.qrTitle}>Loading QR...</Text>
                )}
              </View>
            ) : (
              <View style={styles.webviewContainer}>
                <iframe
                  src={isClientReady ? finalWebPreviewURL : undefined}
                  style={styles.iframe}
                  ref={(c) =>
                    (webPreviewRef.current = c?.contentWindow ?? null)
                  }
                />
                {isClientReady && !finalWebPreviewURL && (
                  <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>
                      Set the SDK Version to 40.0.0 or higher to use Web preview
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowQR(!showQR)}
          >
            <Text style={styles.toggleButtonText}>
              {showQR ? "Show Web Preview" : "Show QR Code"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },
  componentsSection: {
    width: 200, 
    marginRight: 20, 
  },
  editorContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#555",
    padding: 10,
    backgroundColor: "#222",
    minHeight: 300,
    height: 900,
    borderRadius:10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  codeContainer: {
    borderWidth: 1,
    borderColor: "#555",
    padding: 10,
    fontFamily: "monospace",
    fontSize: 14,
    color: "#EEE",
    minHeight: 900,
    backgroundColor: "#222",
  },
  rightContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  previewWrapper: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    width: "100%",
  },
  qrWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
  },
  qrTitle: {
    color: "white",
  },
  webviewContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#FFF",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
  warningContainer: {
    padding: 10,
    backgroundColor: "#FF4444",
    borderRadius: 5,
    marginTop: 10,
  },
  warningText: {
    color: "white",
    textAlign: "center",
  },
  toggleButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    marginTop: 20, 
    width: "80%",
    alignItems: "center",
  },
  toggleButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

`,
  "useSnack": `import React, { useState, useEffect, useRef } from "react";
import { Snack } from "snack-sdk";
import { Platform } from "react-native";
import { componentData } from "../componentData";
import { fileData } from "../componentData";

const useSnack = (defaultCode: string) => {
  const webPreviewRef = useRef(null);
  const [snackId, setSnackId] = useState(null);
  const [snack] = useState(
    () =>
      new Snack({
        codeChangesDelay: 500,
        disabled: Platform.OS !== "web",
        online: true,
        name: "Wonderful Orange",
        description: "It's a wonderful world",
        webPreviewRef: Platform.OS === "web" ? webPreviewRef : undefined,
        sdkVersion: "52.0.0",
        files: {
          "App.js": {
            type: "CODE",
            contents: defaultCode,
          },
          ...fileData,
        },
        dependencies: {
          "expo-av": { version: "*" },
          "expo-font": { version: "*" },
          "expo-app-loading": { version: "*" },
          "expo-linear-gradient": {
            version: "8.2.1",
          },
        },
      })
  );


  const [snackState, setSnackState] = useState(snack.getState());
  console.log(typeof snackState.files?.["App.js"]?.contents === "string");
  const [isClientReady, setClientReady] = useState(false);
  console.log(snack.getState());

  useEffect(() => {
    const listeners = [
      snack.addStateListener((state, prevState) => {
        setSnackState(state);
        if (state.connectedClients !== prevState.connectedClients) {
          for (const key in state.connectedClients) {
            if (!prevState.connectedClients[key]) {
              console.log(
                "A client has connected! " +
                  state.connectedClients[key].platform
              );
            }
          }
        }
      }),
      snack.addLogListener(({ message }) => console.log(message)),
    ];
    setClientReady(true);
    snack.setOnline(true);

    return () => listeners.forEach((listener) => listener());
  }, [snack]);

  const updateCode = async (newCode: string) => {
    snack.updateFiles({
      "App.js": {
        type: "CODE",
        contents: newCode,
      },
      "../../assets/images/favicon.png": {
        type: "ASSET",
        contents: "../../assets/images/favicon.png",
      },
    });

    try {
      const savedSnack = await snack.saveAsync();
      console.log("Snack saved successfully:", savedSnack);

      if (savedSnack.id) {
        setSnackId(savedSnack.id);
      }
    } catch (error) {
      console.error("Error saving Snack:", error);
    }
  };

  return [
    snack,
    { ...snackState, snackId },
    updateCode,
    webPreviewRef,
    isClientReady,
  ];
};

export default useSnack;


`,
  "Test": `import React from 'react'
import {View,Text} from "react-native"
import ButtonComponent from '@/app/widgets/ButtonComponent'

function Test() {
  return (
    <View>
        <Text>Test</Text>
    </View>
  )
}

export default Test;`,
  "index": `import { Image, StyleSheet } from "react-native";
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
`,
  "ButtonConfig": `import React from "react";
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

`,
  "ButtonComponent": `

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

`,
};



export const fileData = {
  "@/app/(tabs)/Component": {
    type: "CODE",
    contents: `import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { componentData } from "@/app/componentData";

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

`
  },
  "@/app/(tabs)/SnackPlayer": {
    type: "CODE",
    contents: `import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import useSnack from "@/app/(tabs)/useSnack";
import QRCode from "react-native-qrcode-svg";
import { componentData } from "@/app/componentData";
import Component from "@/app/(tabs)/Component";
import Editor from '@monaco-editor/react';

const data = Object.entries(componentData).map(([name, code]) => ({
  name,
  code,
}));

export default function SnackPlayer() {
  const [currentComponent, setCurrentComponent] = useState(data[0]);
  const [snack, snackState, updateCode, webPreviewRef, isClientReady] =
    useSnack(currentComponent.code);

  const [showQR, setShowQR] = useState(true); 

  useEffect(() => {
    updateCode(currentComponent.code);
  }, [currentComponent]);

  const { url, webPreviewURL } = snackState;
  const finalWebPreviewURL = webPreviewURL;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Component
          onSelect={(code, name) => setCurrentComponent({ name, code })}
        />

        <View style={styles.editorContainer}>
          <Text style={styles.title}>Editing: {currentComponent.name}</Text>
          <Editor
            height="100%"
            language="javascript"
            theme="vs-dark"
            value={currentComponent.code}
            onChange={(newCode) =>
              setCurrentComponent((prev) => ({ ...prev, code: newCode }))
            }
            options={{
              automaticLayout: true,
              minimap: { enabled: true, scale: 1.2, showSlider: "always" },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              fontSize: 14,
              fontFamily: "Fira Code, Menlo, Monaco, 'Courier New', monospace",
              cursorBlinking: "smooth",
              lineNumbers: "on",
              renderIndentGuides: true,
              overviewRulerBorder: false,
              folding: true,
              showFoldingControls: "always",
              quickSuggestions: true,
              suggestOnTriggerCharacters: true,
              matchBrackets: "always",
              bracketPairColorization: { enabled: true },
              autoClosingBrackets: "always",
              autoClosingQuotes: "always",
              renderLineHighlight: "all",
              selectionHighlight: true,
              occurrencesHighlight: true,
            }}
          />
        </View>

//         <View style={styles.rightContainer}>
//           <View style={styles.previewWrapper}>
//             {showQR ? (
              <View style={styles.qrWrapper}>
                {url ? (
                  <QRCode value={url} size={180} />
                ) : (
                  <Text style={styles.qrTitle}>Loading QR...</Text>
                )}
              </View>
            ) : (
              <View style={styles.webviewContainer}>
                <iframe
                  src={isClientReady ? finalWebPreviewURL : undefined}
                  style={styles.iframe}
                  ref={(c) =>
                    (webPreviewRef.current = c?.contentWindow ?? null)
                  }
                />
                {isClientReady && !finalWebPreviewURL && (
                  <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>
                      Set the SDK Version to 40.0.0 or higher to use Web preview
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowQR(!showQR)}
          >
            <Text style={styles.toggleButtonText}>
              {showQR ? "Show Web Preview" : "Show QR Code"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },
  componentsSection: {
    width: 200, 
    marginRight: 20, 
  },
  editorContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#555",
    padding: 10,
    backgroundColor: "#222",
    minHeight: 300,
    height: 900,
    borderRadius:10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  codeContainer: {
    borderWidth: 1,
    borderColor: "#555",
    padding: 10,
    fontFamily: "monospace",
    fontSize: 14,
    color: "#EEE",
    minHeight: 900,
    backgroundColor: "#222",
  },
  rightContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  previewWrapper: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    width: "100%",
  },
  qrWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
  },
  qrTitle: {
    color: "white",
  },
  webviewContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#FFF",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
  warningContainer: {
    padding: 10,
    backgroundColor: "#FF4444",
    borderRadius: 5,
    marginTop: 10,
  },
  warningText: {
    color: "white",
    textAlign: "center",
  },
  toggleButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    marginTop: 20, 
    width: "80%",
    alignItems: "center",
  },
  toggleButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

`
  },
  "@/app/(tabs)/useSnack": {
    type: "CODE",
    contents: `import React, { useState, useEffect, useRef } from "react";
import { Snack } from "snack-sdk";
import { Platform } from "react-native";
import { componentData } from "../componentData";
import { fileData } from "../componentData";

const useSnack = (defaultCode: string) => {
  const webPreviewRef = useRef(null);
  const [snackId, setSnackId] = useState(null);
  const [snack] = useState(
    () =>
      new Snack({
        codeChangesDelay: 500,
        disabled: Platform.OS !== "web",
        online: true,
        name: "Wonderful Orange",
        description: "It's a wonderful world",
        webPreviewRef: Platform.OS === "web" ? webPreviewRef : undefined,
        sdkVersion: "52.0.0",
        files: {
          "App.js": {
            type: "CODE",
            contents: defaultCode,
          },
          ...fileData,
        },
        dependencies: {
          "expo-av": { version: "*" },
          "expo-font": { version: "*" },
          "expo-app-loading": { version: "*" },
          "expo-linear-gradient": {
            version: "8.2.1",
          },
        },
      })
  );


  const [snackState, setSnackState] = useState(snack.getState());
  console.log(typeof snackState.files?.["App.js"]?.contents === "string");
  const [isClientReady, setClientReady] = useState(false);
  console.log(snack.getState());

  useEffect(() => {
    const listeners = [
      snack.addStateListener((state, prevState) => {
        setSnackState(state);
        if (state.connectedClients !== prevState.connectedClients) {
          for (const key in state.connectedClients) {
            if (!prevState.connectedClients[key]) {
              console.log(
                "A client has connected! " +
                  state.connectedClients[key].platform
              );
            }
          }
        }
      }),
      snack.addLogListener(({ message }) => console.log(message)),
    ];
    setClientReady(true);
    snack.setOnline(true);

    return () => listeners.forEach((listener) => listener());
  }, [snack]);

  const updateCode = async (newCode: string) => {
    snack.updateFiles({
      "App.js": {
        type: "CODE",
        contents: newCode,
      },
      "../../assets/images/favicon.png": {
        type: "ASSET",
        contents: "../../assets/images/favicon.png",
      },
    });

    try {
      const savedSnack = await snack.saveAsync();
      console.log("Snack saved successfully:", savedSnack);

      if (savedSnack.id) {
        setSnackId(savedSnack.id);
      }
    } catch (error) {
      console.error("Error saving Snack:", error);
    }
  };

  return [
    snack,
    { ...snackState, snackId },
    updateCode,
    webPreviewRef,
    isClientReady,
  ];
};

export default useSnack;


`
  },
  "@/app/(tabs)/Test": {
    type: "CODE",
    contents: `import React from 'react'
import {View,Text} from "react-native"
import ButtonComponent from '@/app/widgets/ButtonComponent'

function Test() {
  return (
    <View>
        <Text>Test</Text>
    </View>
  )
}

export default Test;`
  },
  "@/app/(tabs)/index": {
    type: "CODE",
    contents: `import { Image, StyleSheet } from "react-native";
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
`
  },
  "@/app/configurations/ButtonConfig": {
    type: "CODE",
    contents: `import React from "react";
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

`
  },
  "@/app/widgets/ButtonComponent": {
    type: "CODE",
    contents: `

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

`
  }
}