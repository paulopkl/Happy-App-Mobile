import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarkerImg from '../images/map-marker.png';
import api from '../services/api';

import { styles } from '../styles/styles';

interface Orphanages {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanages[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get('orphanages')
      .then(response => {
        setOrphanages(response.data);
      })
      .catch(err => {
        alert(err);
      })
  }, []);

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -22.824178,
          longitude:  -47.270206,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }} 
        style={styles.mapStyle}>
        {orphanages.map(orphanage => (
          <Marker key={orphanage.id}
          icon={mapMarkerImg}
          calloutAnchor={{ x: 2.75, y: 0.85 }}
          coordinate={{ latitude: +orphanage.latitude, longitude: +orphanage.longitude }}>
            <Callout tooltip={true} onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
        <RectButton style={styles.createOrphanage} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </SafeAreaView>
  );
}