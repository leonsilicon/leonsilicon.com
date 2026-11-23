import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { site } from "./content";

export function NativePage({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.page}>
          <Text style={styles.brand}>›_  <Text style={styles.brandName}>leonsilicon</Text></Text>
          {children}
          <Text style={styles.footer}>© {site.name}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b0b13" },
  scroll: { paddingHorizontal: 22, paddingBottom: 20 },
  page: { alignSelf: "center", width: "100%", maxWidth: 640 },
  brand: { color: "#bca5ff", fontSize: 17, fontWeight: "800", paddingTop: 14, paddingBottom: 27 },
  brandName: { color: "#f5f3ff" },
  footer: { marginTop: 33, paddingTop: 17, borderTopWidth: 1, borderTopColor: "#252438", color: "#aaa8bf" },
});
