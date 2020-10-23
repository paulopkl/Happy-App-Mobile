import React from 'react';

import { SafeAreaView, Text, Image, StyleSheet, Dimensions, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import Kids from '../../images/kids.png';
import { useNavigation } from '@react-navigation/native';

export default function Onboarding1() {
    const navigation = useNavigation();

    const navigateToMaps = () => { 
        navigation.navigate('OrphanagesMap');
    }

    return (
        <SafeAreaView style={styles.onBoardingView}>
            <Image source={Kids} style={styles.kidsImage} />
            <Text style={styles.happyText}>Escolha um orfanato no mapa e faça uma visita</Text>
            <View style={styles.footer}>
                <View />
                <RectButton style={styles.buttonOnboard2} onPress={navigateToMaps}>
                    <Feather name="arrow-right" size={30} color="#15C3D6" />
                </RectButton>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    onBoardingView: {
        paddingVertical: Dimensions.get('window').height / 20,
        paddingHorizontal: Dimensions.get('window').width / 10,
    },

    kidsImage: {
        width: Dimensions.get('window').width / 1.22,
    },
    
    buttonOnboard2: {
        backgroundColor: '#D1EDF2',
        width: 56,
        height: 56,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    happyText: {
        fontSize: 30,
        color: '#0089A5',
        width: Dimensions.get('window').width / 1.3,
        textAlign: 'right',
        lineHeight: 36,
        fontFamily: 'Nunito_800ExtraBold',
        marginVertical: Dimensions.get('window').height / 50,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});