import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#1E2A84" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
