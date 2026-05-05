import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useESP32 } from "../components/firebase_acc";
import { ControlCenter } from "../components/firebase_controlcenter";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Theme State
  const insets = useSafeAreaInsets();

  const MAX_OCCUPANCY = 3;

  // Occupancy data from your Firebase hook
  const { data: occupancy, loading } = useESP32(
    "room_data/occupancy/current_count",
  );

  // Dynamic Styles based on Theme
  const theme = {
    bg: isDarkMode ? "bg-slate-950" : "bg-slate-50",
    card: isDarkMode ? "bg-slate-900/50" : "bg-white",
    textPrimary: isDarkMode ? "text-white" : "text-slate-900",
    textSecondary: isDarkMode ? "text-slate-500" : "text-slate-400",
    border: isDarkMode ? "border-slate-800" : "border-slate-200",
  };

  const isFull = occupancy >= MAX_OCCUPANCY;

  return (
    <View
      className={`flex-1 ${theme.bg}`}
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <View className="flex-1 p-8 justify-between">
        {/* Header & Theme Toggle */}
        <View className="mt-4 flex-row justify-between items-start">
          <View>
            <View className="flex-row items-center space-x-2">
              <View
                className={`h-2 w-2 rounded-full animate-pulse ${isFull ? "bg-red-500" : "bg-blue-500"}`}
              />
              <Text className="text-blue-500 font-bold tracking-[3px] text-[10px]">
                {isFull ? "CAPACITY REACHED" : "SYSTEM LIVE"}
              </Text>
            </View>
            <Text className={`${theme.textPrimary} text-4xl font-black mt-1`}>
              Room View
            </Text>
          </View>

          {/* Theme Toggle Button */}
          <Pressable
            onPress={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-2xl border ${theme.border} ${theme.card}`}
          >
            <Text className="text-lg">{isDarkMode ? "🌙" : "☀️"}</Text>
          </Pressable>
        </View>

        {/* Hero Occupancy Section */}
        <View className="items-center justify-center">
          <Text
            className={`${theme.textSecondary} font-bold uppercase tracking-widest text-[10px] mb-4`}
          >
            Current Attendance
          </Text>

          <View className="flex-row items-baseline">
            <Text
              className={`${theme.textPrimary} text-[140px] font-black leading-[140px]`}
            >
              {loading ? ".." : (occupancy ?? 0)}
            </Text>
            <Text className={`${theme.textSecondary} text-4xl font-black ml-2`}>
              / {MAX_OCCUPANCY}
            </Text>
          </View>

          <Text className={`${theme.textSecondary} text-lg font-medium`}>
            Total Limit: {MAX_OCCUPANCY} pax
          </Text>

          {/* Status Indicator */}
          <View
            className={`mt-8 px-6 py-2 rounded-2xl border ${
              occupancy > 0
                ? isFull
                  ? "bg-red-500/10 border-red-500/30"
                  : "bg-emerald-500/10 border-emerald-500/30"
                : `${theme.card} ${theme.border}`
            }`}
          >
            <Text
              className={`font-bold tracking-tight ${
                occupancy > 0
                  ? isFull
                    ? "text-red-500"
                    : "text-emerald-400"
                  : theme.textSecondary
              }`}
            >
              {occupancy <= 0
                ? "• ROOM EMPTY"
                : isFull
                  ? "• ROOM FULL"
                  : "• SESSION ACTIVE"}
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <View className="mb-4">
          <Pressable
            onPress={() => setModalVisible(true)}
            className="bg-blue-600 h-20 rounded-[32px] items-center justify-center shadow-2xl shadow-blue-500/40 active:bg-blue-700 active:scale-[0.97]"
          >
            <Text className="text-white text-xl font-black tracking-tight">
              CONTROL CENTER
            </Text>
          </Pressable>
        </View>

        <ControlCenter
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          isDarkMode={isDarkMode} // Pass the state here
        />
      </View>
    </View>
  );
}
