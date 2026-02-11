import { Drawer } from 'expo-router/drawer';
import { useUserStore } from '../../src/store/userStore';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import { View, Text, Pressable } from 'react-native';
// 自定义侧边栏内容组件
// 自定义侧边栏内容组件
function CustomDrawerContent(props: any) {
    const { user, logout } = useUserStore();

    return (
        <DrawerContentScrollView {...props}>
            {/* Profile Header in Drawer */}
            <Pressable
                onPress={() => props.navigation.navigate('profile')}
                style={({ pressed }) => ({
                    padding: 20,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    marginBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#eee',
                    opacity: pressed ? 0.7 : 1,
                    backgroundColor: pressed ? '#f5f5f5' : 'transparent'
                })}
            >
                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>{user?.name?.[0] || 'U'}</Text>
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{user?.name || 'Guest'}</Text>
                <Text style={{ fontSize: 14, color: '#666' }}>View Profile</Text>
            </Pressable>



            {/* 渲染下面定义的 Drawer.Screen 列表 */}
            {/* The items (tabs, profile, change-password) are hidden via their 'options' below, not filtered here */}
            {/* 这些项目（tabs, profile, change-password）通过下面的 'options' 隐藏，而不是在这里过滤 */}
            <DrawerItemList {...props} />

            {/* 退出登录按钮 */}
            <DrawerItem
                label="Sign Out / 退出登录"
                labelStyle={{ color: 'red' }}
                onPress={() => {
                    logout();
                    // 状态变更后，RootLayout 的 Redirect 会自动把你带回登录页
                }}
            />
        </DrawerContentScrollView>
    );
}

export default function MainLayout() {
    return (
        <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>

            {/* <Drawer> */}
            <Drawer.Screen
                name="profile"
                options={{
                    drawerLabel: 'Profile / 个人资料',
                    title: 'Profile / 个人资料',
                    headerShown: true,
                    drawerItemStyle: { display: 'none' } // Hidden because we added a manual item above / 因为上面添加了手动项所以隐藏
                }}
            />

            <Drawer.Screen
                name="settings"
                options={{
                    drawerLabel: 'Settings / 设置',
                    title: 'Settings / 设置',
                    headerShown: true,
                }}
            />

            <Drawer.Screen
                name="change-password"
                options={{
                    drawerLabel: 'Change Password',
                    title: 'Change Password',
                    headerShown: true,
                    // drawerItemStyle: { display: 'none' } // Hidden / 隐藏
                }}
            />
            <Drawer.Screen
                name="tabs"
                options={{
                    drawerLabel: 'Home',
                    title: 'Home',
                    headerShown: false, // <--- 添加这一行
                    drawerItemStyle: { display: 'none' }
                }}
            />
        </Drawer>
    );
}