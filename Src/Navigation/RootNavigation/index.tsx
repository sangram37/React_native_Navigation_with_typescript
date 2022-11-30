
import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Login from '../../Screens/Auth/Login';
import Signup from '../../Screens/Auth/Signup';
import { RootStackParamList } from '../../Navigation/RootStackPrams';


const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    );
}
export default RootNavigation;