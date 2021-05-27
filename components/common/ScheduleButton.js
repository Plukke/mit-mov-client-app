import React from 'react';
import { Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

export default function ScheduleButton() {
  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      console.log('SCREEN FOCUS');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <Button
      icon={
        <MaterialCommunityIcons name='calendar-today' color='white' size={24} />
      }
      title='Button with icon component'
      onPress={() => navigation.navigate('Schedule')}
    />
  );
}
