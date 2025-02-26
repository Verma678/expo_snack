import React, { useState, useEffect } from "react";
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

