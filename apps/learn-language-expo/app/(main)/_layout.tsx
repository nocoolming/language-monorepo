import { Drawer } from 'expo-router/drawer';
import { useAuthStore } from '../../store';
// 修正这里：从 @react-navigation/drawer 导入内容组件
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

// 自定义侧边栏内容组件
function CustomDrawerContent(props: any) {
    const logout = useAuthStore((state) => state.logout); // 假设你的 store 有 logout 方法

    return (
        <DrawerContentScrollView {...props}>
            {/* 渲染下面定义的 Drawer.Screen 列表 */}
            <DrawerItemList {...props} />

            {/* 退出登录按钮 */}
            <DrawerItem
                label="退出登录"
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
            {/* 必须叫 "tabs"，因为它要匹配同级目录下的 tabs 文件夹 */}
            <Drawer.Screen
                name="tabs"
                options={{
                    drawerLabel: '主页',
                    title: 'App',
                    drawerItemStyle: { display: 'none' }, // 彻底从侧边栏列表中移除占位
                    headerShown: false, // 隐藏 Drawer 的顶栏，让 Tabs 的顶栏显示
                }}
            />
            {/* 新增的页面 1：设置 */}
            <Drawer.Screen
                name="change-password" // 对应 app/(main)/settings.tsx
                options={{
                    drawerLabel: 'ChangePassword',
                    title: 'ChangePassword',
                    headerShown: true, // 独立页面建议开启顶栏以便返回
                }}
            />

            {/* 新增的页面 2：关于 */}
            {/* <Drawer.Screen
                name="explore" // 对应 app/(main)/about.tsx
                options={{
                    drawerLabel: 'explore',
                    title: 'explore',
                    headerShown: true,
                }}
            /> */}
        </Drawer>
    );
}