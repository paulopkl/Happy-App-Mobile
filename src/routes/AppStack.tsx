import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from '../pages/OrphanagesMap';
import SelectMapPosition from '../pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from '../pages/CreateOrphanage/OrphanageData';
import OrphanageDetails from '../pages/OrphanageDetails';
import Onboarding_1 from '../pages/Onboard/Onboarding1';
import Onboarding_2 from '../pages/Onboard/Onboarding2';
import Header from '../components/Header';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ cardStyle: { backgroundColor: '#F2F3F5' } }}>
        <Screen 
          name="Onboarding_1" 
          component={Onboarding_1} 
          options={{ headerShown: false }} 
        />
        <Screen 
          name="Onboarding_2" 
          component={Onboarding_2} 
          options={{ headerShown: false }} 
        />
        <Screen 
          name="OrphanagesMap" 
          component={OrphanagesMap} 
          options={{ headerShown: false }} 
        />
        <Screen 
          name="SelectMapPosition" 
          component={SelectMapPosition} 
          options={{ headerShown: true, header: props => <Header title="Selecione no mapa" {...props} /> }} 
        />
        <Screen 
          name="OrphanageData" 
          component={OrphanageData} 
          options={{ headerShown: true, header: props => <Header title="Dados do orfanato" {...props} /> }} 
        />
        <Screen 
          name="OrphanageDetails" 
          component={OrphanageDetails} 
          options={{ headerShown: true, header: props => <Header title="Orfanato" showCancel={false} {...props} /> }} 
        />
      </Navigator>
    </NavigationContainer>
  );
}