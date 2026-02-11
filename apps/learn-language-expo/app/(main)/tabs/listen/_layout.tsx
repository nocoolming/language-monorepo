import { Stack } from "expo-router";

export default function CommunityLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="article/[id]" options={{ headerShown: false }} />
        </Stack>
    );
}