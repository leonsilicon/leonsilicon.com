import { Link } from "expo-router";

import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { NativePage } from "./native-page";
import { projects, site } from "./content";

const processor = require("./assets/processor.webp");

export default function Home() {
  return (
    <NativePage>
      <View style={styles.hero}>
        <Text style={styles.label}>SOFTWARE DEVELOPER</Text>
        <Text accessibilityRole="header" style={styles.title}>
          Hi, I’m{"\n"}<Text style={styles.accent}>Leon Si.</Text>
        </Text>
        <Text style={styles.intro}>{site.tagline}</Text>
        <Image source={processor} resizeMode="cover" style={styles.art} accessible={false} />
      </View>

      <View style={styles.section}>
        <Text accessibilityRole="header" style={styles.heading}>Selected work</Text>
        <View style={styles.projects}>
          {projects.map((project) => (
            <Pressable
              key={project.name}
              accessibilityRole="link"
              onPress={() => void Linking.openURL(project.url)}
              style={({ pressed }) => [styles.project, pressed && styles.pressed]}
            >
              <View style={styles.projectCopy}>
                <Text style={styles.label}>{project.category.toUpperCase()}</Text>
                <Text style={styles.projectTitle}>{project.name}</Text>
                <Text style={styles.body}>{project.description}</Text>
              </View>
              <Text style={styles.accent} accessibilityElementsHidden importantForAccessibility="no">↗</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text accessibilityRole="header" style={styles.heading}>About me</Text>
        <Text style={styles.body}>{site.bio}</Text>
        <View style={styles.actions}>
          <Pressable accessibilityRole="link" onPress={() => void Linking.openURL(site.github)} style={styles.button}>
            <Text style={styles.buttonText}>GitHub ↗</Text>
          </Pressable>
          <Pressable accessibilityRole="link" onPress={() => void Linking.openURL(`mailto:${site.email}`)} style={styles.button}>
            <Text style={styles.buttonText}>Get in touch ↗</Text>
          </Pressable>
          <Link href="/install" asChild>
            <Pressable accessibilityRole="link" style={styles.button}>
              <Text style={styles.buttonText}>Share the app</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </NativePage>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 16 },
  label: { color: "#bca5ff", fontSize: 11, fontWeight: "700", letterSpacing: 1.6 },
  title: { color: "#f5f3ff", fontSize: 64, fontWeight: "800", letterSpacing: -4, lineHeight: 69 },
  accent: { color: "#c2abff" },
  intro: { color: "#aaa8bf", fontSize: 18, lineHeight: 27 },
  art: { width: "100%", aspectRatio: 1.32, borderRadius: 16, backgroundColor: "#151229" },
  section: { gap: 14, marginTop: 32 },
  heading: { color: "#f5f3ff", fontSize: 29, fontWeight: "800", letterSpacing: -1 },
  projects: { gap: 10 },
  project: {
    flexDirection: "row", alignItems: "flex-start", gap: 12, borderWidth: 1,
    borderColor: "#28263d", borderRadius: 13, backgroundColor: "#141321", padding: 16,
  },
  projectCopy: { flex: 1, gap: 5 },
  projectTitle: { color: "#f5f3ff", fontSize: 18, fontWeight: "700" },
  body: { color: "#aaa8bf", fontSize: 15, lineHeight: 23 },
  pressed: { backgroundColor: "#241d37" },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  button: {
    paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: "#47375e",
    borderRadius: 9, backgroundColor: "#1c172b",
  },
  buttonText: { color: "#d7c8ff", fontWeight: "700" },
});
