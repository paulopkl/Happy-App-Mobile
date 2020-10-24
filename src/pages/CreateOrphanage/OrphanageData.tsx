import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';

import { styles } from '../../styles/styles';

interface OrphanageDataRouteParams { 
  position: { 
    latitude: number, 
    longitude: number
  }; 
}

export default function OrphanageData() {
  const route = useRoute();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpenin_hours] = useState('');
  const [open_on_weekends, setOpen_on_weekends] = useState(false);
  const [images, setImages] = useState<string[]>([])

  const params = route.params as OrphanageDataRouteParams;
  const position = params.position;

  const handleCreateOrphanage = () => {
    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('whatsapp', String(whatsapp));
    data.append('instructions', String(instructions));
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('opening_hours', String(opening_hours));
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach((image, index) => {
      data.append('images', { 
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    })
    
    api.post('orphanages', data)
      .then(res => {
        console.log(data);
        navigation.navigate('OrphanagesMap');
      })
      .catch(err => {
        alert(err);
      });

  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Eita! Precisamos de acesso às suas fotos...');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, 
      quality: 1, 
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if(result.cancelled) return;

    const { uri: image } = result;

    setImages([ ...images, image ]);
  }

  return (
    <ScrollView style={styles.containerData} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.titleData}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} onChangeText={text => setName(text)} />

      <Text style={styles.label}>Sobre</Text>
      <TextInput style={[styles.input, { height: 110 }]} multiline 
        onChangeText={text => setAbout(text)} />

      <Text style={styles.label}>WhatsApp</Text>
      <TextInput style={styles.input} onChangeText={text => setWhatsapp(text)} />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map(image => <Image
          key={image}
          source={{ uri: image }} 
          style={styles.uploadedImage} 
        /> )}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.titleData}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput style={[styles.input, { height: 110 }]} multiline 
        onChangeText={text => setInstructions(text)} />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput style={styles.input} onChangeText={text => setOpenin_hours(text)} />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={bool => setOpen_on_weekends(bool)}
        />
      </View>

      <RectButton style={styles.nextButtonData} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonTextData}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}