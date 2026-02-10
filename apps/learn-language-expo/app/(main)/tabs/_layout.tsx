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
                name="index"
                options={{
                    title: '首页',
                    tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text>,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'explore',
                    tabBarIcon: ({ color }) => <Text style={{ color }}>🔍</Text>,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Text style={{ color }}>🔍</Text>,
                }}
            />
        </Tabs>
    );
}