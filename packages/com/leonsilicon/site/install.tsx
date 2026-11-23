import { Link } from "expo-router";
import { Share, StyleSheet, Text, View } from "react-native";
import { NativePage } from "./native-page";
import { site } from "./content";

export default function Install() {
  return (
    <NativePage>
      <View style={styles.content}>
        <Link href="/" style={styles.link}>‹ Back to home</Link>
        <Text accessibilityRole="header" style={styles.title}>Share this app</Text>
        <Text style={styles.body}>Send the installation link to another phone.</Text>
        <Text
          accessibilityRole="button"
          onPress={() => void Share.share({ message: site.installUrl })}
          style={styles.link}
        >
          Share install link ↗
        </Text>
      </View>
    </NativePage>
  );
}

const styles = StyleSheet.create({
  content: { gap: 15 },
  title: { color: "#f5f3ff", fontSize: 43, fontWeight: "800", letterSpacing: -2 },
  body: { color: "#aaa8bf", fontSize: 16 },
  link: { color: "#c6b5ff", fontSize: 16, fontWeight: "700", paddingVertical: 7 },
});
