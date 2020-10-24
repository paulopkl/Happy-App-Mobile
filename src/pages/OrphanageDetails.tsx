import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

import * as Location from 'expo-location';

import api from '../services/api';

import mapMarkerImg from '../images/map-marker.png';

import { styles } from '../styles/styles';

interface OrphanageDetailsRouteParams { id: number; }

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  whatsapp: string;
  instructions: string;
  description: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>
}

const mensagem = "Boa tarde gostária de saber qual o melhor horário para eu fazer uma visita?";

export default function OrphanageDetails() {
  const route = useRoute();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });
  
  const params = route.params as OrphanageDetailsRouteParams;

  useEffect(() => {
    api.get(`orphanages/${params.id}`)
      .then((response: any) => { 
        setOrphanage(response.data); 
      })
      .catch(err => {
        alert('Erro ao puxar dados da API!');
      })
    getLocationAsync();
  }, [params.id]);

  const getLocationAsync = async () => {
    await Location.requestPermissionsAsync()
      .then(async resp => {
        let location = await Location.getCurrentPositionAsync();
        let { latitude, longitude } =  location.coords;
        setCurrentPosition({ latitude, longitude });
        return;
      })
      .catch(err => {
        alert("Precisamos de sua localização para definir uma rota até o orfanato!!");
        setCurrentPosition({ latitude: -22.824236, longitude: -47.270097 });
        return;
      })
   }

  const handleOpenGooleMapsRoute = () => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${currentPosition.latitude},${currentPosition.longitude}&destination=${orphanage?.latitude},${orphanage?.longitude}`);
  }

  if (!orphanage) {
    return (
      <SafeAreaView style={styles.containerDetails}>
        <Text style={styles.description}>Carregando...</Text>
      </SafeAreaView>
    )
  }

  return (
    <ScrollView style={styles.containerDetails}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map(image => {
            const imageUrl = image.url.slice(0, 21) === 'http://localhost:3333' 
              ? image.url.slice(21) 
              : image.url.slice(39);
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
            style={styles.mapStyleDetails}
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

        <RectButton 
          style={styles.contactButton} onPress={() => {
            Linking.openURL(`whatsapp://send?text=${mensagem}&phone=55${+orphanage.whatsapp}`)
        }}>
            <FontAwesome name="whatsapp" size={24} color="#FFF" />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}