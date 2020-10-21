import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// import { Location, Permissions } from 'expo';

import api from '../services/api';

import mapMarkerImg from '../images/map-marker.png';

interface OrphanageDetailsRouteParams { id: number; }

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  description: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>
}

export default function OrphanageDetails() {
  const route = useRoute();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });
  
  const params = route.params as OrphanageDetailsRouteParams;

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((response: any) => { setOrphanage(response.data); });
    getLocationAsync();
  }, [params.id]);

  const getLocationAsync = async () => {
  
    // let { status } = await Location.askAsync(Permissions.LOCATION);
    let { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      alert("Precisamos de sua localização para definir uma rota até o orfanato!!");
      setCurrentPosition({ latitude: -22.824236, longitude: -47.270097 });
      return;
    } else { 
      let location = await Location.getCurrentPositionAsync();
      let { latitude, longitude } =  location.coords;
      setCurrentPosition({ latitude, longitude });
      return;
    }

    // navigator.geolocation.getCurrentPosition(position => {
    //   const { latitude, longitude } = position.coords;
    //   setCurrentPosition({ latitude, longitude });
    // });
   }

  const handleOpenGooleMapsRoute = () => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${currentPosition.latitude},${currentPosition.longitude}&destination=${orphanage?.latitude},${orphanage?.longitude}`);
  }

  if (!orphanage) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.description}>Carregando...</Text>
      </SafeAreaView>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map(image => {
            const imageUrl = image.url.slice(0, 21) === 'http://localhost:3333' 
              ? image.url.slice(21) 
              : image.url.slice(39);
            console.log(imageUrl);
            return (
              <Image 
                key={image.id} 
                source={{ uri: api.defaults.baseURL + imageUrl }} 
                style={styles.image} 
              />
            )
          })}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage.name}</Text>
        <Text style={styles.description}>{orphanage.about}</Text>
      
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
              latitude: -22.824178,
              longitude:  -47.270206,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ 
                latitude: -22.824178,
                longitude:  -47.270206,
              }}
            />
          </MapView>

          <TouchableOpacity style={styles.routesContainer} onPress={handleOpenGooleMapsRoute}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{orphanage.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              Segunda à Sexta {orphanage.opening_hours}
            </Text>
          </View>

          {orphanage.open_on_weekends ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana.</Text>
            </View>
          ) : (
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <Feather name="info" size={40} color="#FF669D" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>
                Não Atendemos fim de semana.
              </Text>
            </View>
          )}
            
        </View>

        <RectButton style={styles.contactButton} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },

  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5'
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },
  
  scheduleItemRed: {
    backgroundColor: '#FEF6F5',
    borderWidth: 1,
    borderColor: '#FFBCD4',
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599'
  },
  
  scheduleTextGreen: {
    color: '#37C77F'
  },

  scheduleTextRed: {
    color: '#FF669D'
  },
  
  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  }
})