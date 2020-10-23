import React from 'react';

import { SafeAreaView, Text, Image, StyleSheet, Dimensions, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import happyEarth from '../../images/happyEarth.png';
import { useNavigation } from '@react-navigation/native';

export default function Onboarding1() {
    const navigation = useNavigation();

    const navigateToNextScreen = () => {
        navigation.navigate('Onboarding2');
    }

    return (
        <SafeAreaView style={styles.onBoardingView}>
            <Image source={happyEarth} style={styles.earthImage} />
            <Text style={styles.happyText}>Leve felicidade para o mundo</Text>
            <Text style={styles.subHappyText}>Visite orfanatos e mude o dia de muitas crianças.</Text>
            <View style={styles.footer}>
                <View />
                <RectButton style={styles.buttonOnboard2} onPress={navigateToNextScreen}>
                    <Feather name="arrow-right" size={30} color="#15C3D6" />
                </RectButton>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    onBoardingView: {
        paddingVertical: Dimensions.get('window').height / 20,
        paddingHorizontal: Dimensions.get('window').width / 9,
    },

    earthImage: {
        marginBottom: Dimensions.get('window').height / 30,
        width: Dimensions.get('window').width / 1.4,
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
        fontSize: 48,
        color: '#0089A5',
        width: Dimensions.get('window').width / 1.5,
        lineHeight: 46,
        fontFamily: 'Nunito_800ExtraBold'
    },

    subHappyText: {
        fontSize: 20,
        color: '#0089A5',
        marginVertical: Dimensions.get('window').height / 45,
        width: Dimensions.get('window').width / 1.4,
        lineHeight: 24,
        fontFamily: 'Nunito_600SemiBold'
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});