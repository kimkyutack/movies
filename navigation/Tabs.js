import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movie";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { View,Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => { 
  const isDark = useColorScheme() === 'dark';
  
  return(
    <Tab.Navigator 
    sceneContainerStyle={{
      backgroundColor : '#1e272e'
    }}
    screenOptions={{
      unmountOnBlur:true,
      tabBarStyle: {
        backgroundColor: '#ffa801'
      },
      tabBarActiveTintColor:'#E7E4E4',
      tabBarInactiveTintColor: '#1e272e',
      headerStyle:{
        backgroundColor:  '#ffa801',
        height:'8%',
      },
      headerTitleStyle:{
        color:'#ffa801',
        fontSize:12,
        fontWeight:'bold'
      },
      headerTitleAlign: "center",
      tabBarLabelStyle:{
        marginTop:-5,
        marginBottom:5,
        fontSize:9,
        fontWeight:'bold'
      },
    }}>
      <Tab.Screen name="영화" component={Movies} options={{
        tabBarIcon: ({focused, color, size}) => {
          return <Ionicons name={"film-outline"} color={color} size={size * 0.8} />
        }
      }}/>
      <Tab.Screen name="시리즈" component={Tv} options={{
        tabBarIcon: ({focused, color, size}) => {
          return <Ionicons name={"tv-outline"} color={color} size={size * 0.8} />
        },
        //tabBarBadge: '3'
      }}/>
      <Tab.Screen name="검색" component={Search} options={{
        tabBarIcon: ({focused, color, size}) => {
          return <Ionicons name={"search-outline"} color={color} size={size * 0.8} />
        }
      }}/>
    </Tab.Navigator>
  );
};

export default Tabs;