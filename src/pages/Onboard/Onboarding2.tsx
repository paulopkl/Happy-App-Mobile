import React from 'react';

import { SafeAreaView, Text, Image, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import Kids from '../../images/kids.png';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles/styles';

export default function Onboarding1() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.onBoardingView_2}>
            <Image source={Kids} style={styles.kidsImage} />
            <Text style={styles.happyText_2}>Escolha um orfanato no mapa e faça uma visita</Text>
            <View style={styles.happyFooter_2}>
                <View />
                <RectButton style={styles.buttonOnboard2} onPress={() => navigation.navigate('OrphanagesMap')}>
                    <Feather name="arrow-right" size={30} color="#15C3D6" />
                </RectButton>
            </View>
        </SafeAreaView>
    );
}