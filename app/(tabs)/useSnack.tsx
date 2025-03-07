import React, { useState, useEffect, useRef } from "react";
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


