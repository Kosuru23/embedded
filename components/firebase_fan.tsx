import React from "react";
import { Pressable, Text } from "react-native";
import { useESP32 } from "./firebase_acc";

interface DeviceProps {
  isDarkMode: boolean;
}

export const FanControl = ({ isDarkMode }: DeviceProps) => {
  const {
    data: isFanOn,
    loading,
    writeData,
  } = useESP32("room_data/actuators/fan_relay");

  // "OFF" State Theme Mapping
  const offStyles = {
    bg: isDarkMode ? "bg-slate-800" : "bg-slate-100",
    border: isDarkMode ? "border-slate-700" : "border-slate-200",
    label: isDarkMode ? "text-slate-500" : "text-slate-400",
    status: isDarkMode ? "text-slate-600" : "text-slate-300",
  };

  return (
    <Pressable
      onPress={() => writeData(!isFanOn)}
      disabled={loading}
      className={`p-6 rounded-3xl items-center justify-center border transition-all active:scale-95 ${
        isFanOn
          ? "bg-blue-500/20 border-blue-500/50"
          : `${offStyles.bg} ${offStyles.border}`
      }`}
    >
      <Text
        className={`text-[10px] font-black mb-2 tracking-tighter ${
          isFanOn ? "text-blue-400" : offStyles.label
        }`}
      >
        VENTILATION
      </Text>
      <Text
        className={`text-2xl font-black ${
          isFanOn ? "text-blue-400" : offStyles.status
        }`}
      >
        {loading ? "..." : isFanOn ? "FAN ON" : "FAN OFF"}
      </Text>
    </Pressable>
  );
};
