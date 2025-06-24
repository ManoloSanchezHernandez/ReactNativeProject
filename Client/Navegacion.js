//llamar los coomponente de lo que necesitamos 
import React, { useContext } from "react";
import { Text } from 'react-native';

//importamos las navegaciones que vamos a usar
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

//llamar a los screen principales
import ScreenAbout from "./src/screen/about/ScreenAbout";
import ScreenHome from "./src/screen/home/ScreenHome";
import ScreenSetting from "./src/screen/setting/ScreenSetting";

//llamara a hijos de Home
import LucesCasa from "./src/screen/home/LucesCasa";
import PuertasCasa from "./src/screen/home/PuertasCasa";
import DetallesHome from "./src/screen/home/DetallesHome";

// importamos los elementos de login
import ScreenLogin from "./src/screen/login/ScreenLogin";
import ScreenCreate from "./src/screen/login/ScreenCreate";
import { estadoLoginGlobal } from "./src/context/contextData";

// declaramos las variables para el uso del nevegacion 
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function MyStackHome() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="menu" component={ScreenHome} options={{ headerShown: false }} />
            <Stack.Screen name="lucescasa" component={LucesCasa} />
            <Stack.Screen name="puertascasa" component={PuertasCasa} />
            <Stack.Screen name="detallescasa" component={DetallesHome} />
        </Stack.Navigator>
    )
}

//creamos las direcciones de el Login
function MyStackLogin() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='logins' component={ScreenLogin} />
            <Stack.Screen name='createaccount' component={ScreenCreate} />
        </Stack.Navigator>
    )
}

//creamos la funcion para asi usar el menu de useCreateDrawer
function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Menu" component={MyStackHome} options={{
                title: 'Dahsboard', drawerPosition: 'right', drawerIcon: ({ color, size }) => (<FontAwesome name="heart" size={size} color={color} />
                )
            }} />
            <Drawer.Screen name="notificaciones" component={MyStackHome} options={{
                title: 'Notificaciones', drawerPosition: 'right', drawerIcon: ({ color, size }) => (<FontAwesome name="heart" size={size} color={color} />
                )
            }} />
            <Drawer.Screen name="perfil" component={MyStackHome} options={{
                title: 'Perfil', drawerPosition: 'right', drawerIcon: ({ color, size }) => (<FontAwesome name="heart" size={size} color={color} />
                )
            }} />
            <Drawer.Screen name="setting" component={MyStackHome} options={{
                title: 'Configuraciones', drawerPosition: 'right', drawerIcon: ({ color, size }) => (<FontAwesome name="heart" size={size} color={color} />
                )
            }} />
        </Drawer.Navigator>
    )
}

//creamos una funcion para asi meter el enrutamiento
function MyTabs() {
    //Se encarga de declarar la ruta, por asi mencionarlo, la ruta es el name, y el componente es a donde lo lleve la ruta 
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={MyStackHome}
                options={{
                    title: 'dashboard',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<FontAwesome name="home" size={size} color={color} />),
                    tabBarLabelPosition: 'beside-icon',
                    tabBarBadge: 10,
                    tabBarBadgeStyle: {
                        color: 'white',
                        backgroundColor: 'rgb(255, 213, 0)'
                    },
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'rgba(99, 99, 99, 0.91)',
                    tabBarActiveBackgroundColor: 'rgba(180, 180, 177, 0.16)',
                    tabBarStyle: { position: 'absolute' },
                }}
            />

            <Tab.Screen
                name="setting"
                component={ScreenSetting}
                options={{
                    title: 'Settings',
                    headerShown: true,
                    tabBarIcon: ({ color, size }) => (<AntDesign name="setting" size={size} color={color} />),
                    tabBarLabelPosition: 'beside-icon',
                    tabBarBadge: 1,
                    tabBarBadgeStyle: {
                        color: 'white',
                        backgroundColor: 'rgb(255, 213, 0)',
                    },
                    ttabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'rgba(99, 99, 99, 0.91)',
                    tabBarActiveBackgroundColor: 'rgba(180, 180, 177, 0.16)',

                }}
            />

            <Tab.Screen
                name="about"
                component={ScreenAbout}
                options={{
                    title: 'About',
                    headerShown: true,
                    tabBarIcon: ({ color, size }) => (<FontAwesome name="user" size={size} color={color} />),
                    tabBarLabelPosition: 'beside-icon',
                    tabBarBadge: 0,
                    tabBarBadgeStyle: {
                        color: 'white',
                        backgroundColor: 'rgb(255, 213, 0)'
                    },
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'rgba(99, 99, 99, 0.91)',
                    tabBarActiveBackgroundColor: 'rgba(180, 180, 177, 0.16)',

                }}
            />

        </Tab.Navigator>
    )
}

export default function Navegacion() {
    const { isLogin } = useContext(estadoLoginGlobal);

    console.log("Estado de login:", isLogin);

    return (
        <>
            {isLogin ? <MyDrawer /> : <MyStackLogin />}
        </>
    );
}