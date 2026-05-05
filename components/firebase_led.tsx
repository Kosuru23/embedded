import React from "react";
import { Pressable, Text } from "react-native";
import { useESP32 } from "./firebase_acc";

interface DeviceProps {
  isDarkMode: boolean;
}

export const LEDControl = ({ isDarkMode }: DeviceProps) => {
  const {
    data: isOn,
    loading,
    writeData,
  } = useESP32("room_data/actuators/led");

  // "OFF" State Theme Mapping
  const offStyles = {
    bg: isDarkMode ? "bg-slate-800" : "bg-slate-100",
    border: isDarkMode ? "border-slate-700" : "border-slate-200",
    label: isDarkMode ? "text-slate-500" : "text-slate-400",
    status: isDarkMode ? "text-slate-600" : "text-slate-300",
  };

  return (
    <Pressable
      onPress={() => writeData(!isOn)}
      disabled={loading}
      className={`p-6 rounded-3xl items-center justify-center border transition-all active:scale-95 ${
        isOn
          ? "bg-amber-500/20 border-amber-500/50"
          : `${offStyles.bg} ${offStyles.border}`
      }`}
    >
      <Text
        className={`text-[10px] font-black mb-2 tracking-tighter ${
          isOn ? "text-amber-400" : offStyles.label
        }`}
      >
        LIGHTING
      </Text>
      <Text
        className={`text-2xl font-black ${
          isOn ? "text-amber-400" : offStyles.status
        }`}
      >
        {loading ? "..." : isOn ? "LED ON" : "LED OFF"}
      </Text>
    </Pressable>
  );
};
