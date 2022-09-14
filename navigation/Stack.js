import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from '../screens/Detail';

const NativeStack = createNativeStackNavigator();

const Stack = () => (
<NativeStack.Navigator 
  screenOptions={{
      headerBackTitleVisible:false,
      animation:'slide_from_left',
      headerStyle: {
        backgroundColor: "#ffa801",
      },
      headerTitleAlign: "center",
   }}>
  <NativeStack.Screen name="Detail" component={Detail}/>
  
</NativeStack.Navigator>
);

export default Stack;