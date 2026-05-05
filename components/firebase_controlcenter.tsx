import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { FanControl } from "./firebase_fan";
import { LEDControl } from "./firebase_led";

interface ControlCenterProps {
  isVisible: boolean;
  onClose: () => void;
  isDarkMode: boolean; // Added theme prop
}

export const ControlCenter = ({
  isVisible,
  onClose,
  isDarkMode,
}: ControlCenterProps) => {
  // Theme mapping
  const theme = {
    modalBg: isDarkMode ? "bg-slate-900" : "bg-white",
    overlay: isDarkMode ? "bg-black/70" : "bg-slate-900/40",
    textPrimary: isDarkMode ? "text-white" : "text-slate-900",
    textSecondary: isDarkMode ? "text-slate-500" : "text-slate-400",
    closeBtn: isDarkMode ? "bg-slate-800" : "bg-slate-100",
    border: isDarkMode ? "border-slate-800" : "border-slate-100",
    handle: isDarkMode ? "bg-slate-800" : "bg-slate-200",
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className={`flex-1 justify-end ${theme.overlay}`}>
        {/* Modal Content */}
        <View
          className={`${theme.modalBg} rounded-t-[50px] p-8 h-[65%] border-t ${theme.border} shadow-2xl`}
        >
          {/* Pull Handle Visual */}
          <View className="items-center mb-6">
            <View className={`w-12 h-1.5 rounded-full ${theme.handle}`} />
          </View>

          {/* Header & Close */}
          <View className="flex-row justify-between items-center mb-10">
            <View>
              <Text
                className={`${theme.textPrimary} text-3xl font-black tracking-tight`}
              >
                Controls
              </Text>
              <Text
                className={`${theme.textSecondary} text-[10px] font-bold uppercase tracking-[2px]`}
              >
                Hardware Actuators
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              className={`${theme.closeBtn} h-12 w-12 rounded-2xl items-center justify-center active:scale-90 transition-all`}
            >
              <Text className={`${theme.textPrimary} font-bold text-lg`}>
                ✕
              </Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap justify-between">
              {/* Device Tiles */}
              {/* Note: You may want to pass isDarkMode to these components too! */}
              <View className="w-[48%] mb-4">
                <FanControl isDarkMode={isDarkMode} />
              </View>

              <View className="w-[48%] mb-4">
                <LEDControl isDarkMode={isDarkMode} />
              </View>

              {/* Status Section / Future Additions */}
              <View
                className={`w-full p-6 mt-2 border-2 border-dashed ${theme.border} rounded-3xl items-center justify-center`}
              >
                <Text
                  className={`${theme.textSecondary} font-bold text-xs uppercase tracking-widest`}
                >
                  Scanning for hardware...
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
