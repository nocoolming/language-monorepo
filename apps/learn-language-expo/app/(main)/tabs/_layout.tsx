import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                headerLeft: () => <DrawerToggleButton tintColor="#000" />,
            }}
        >
            <Tabs.Screen
                name="listen"
                options={{
                    title: '听力',
                    tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🎧</Text>,
                }}
            />
            <Tabs.Screen
                name="speak"
                options={{
                    title: '口语',
                    tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🎙️</Text>,
                }}
            />
            <Tabs.Screen
                name="community"
                options={{
                    title: '社区',
                    tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>👥</Text>,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🏠</Text>,
                }}
            />
            <Tabs.Screen name="explore" options={{ href: null }} />
            <Tabs.Screen name="profile" options={{ href: null }} />
        </Tabs>
    );
}