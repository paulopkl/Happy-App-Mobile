import React, { useState } from 'react';
import { Text, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';

import { styles } from '../../styles/styles';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0});

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  return (
    <SafeAreaView style={styles.containerPosition}>
      <MapView initialRegion={{ latitude: -22.824178, longitude:  -47.270206, latitudeDelta: 0.008,
        longitudeDelta: 0.008,}} 
        onPress={handleSelectMapPosition} style={styles.mapStylePosition}>
          {position.latitude !== 0 && <Marker icon={mapMarkerImg} coordinate={position} />}
      </MapView>

      {position.latitude !== 0 && 
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      }
    </SafeAreaView>
  )
}