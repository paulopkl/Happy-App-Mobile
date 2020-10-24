import React from 'react';

import { SafeAreaView, Text, Image, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import happyEarth from '../../images/happyEarth.png';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles/styles';

export default function Onboarding1() {
    const navigation = useNavigation();

    const navigateToNextScreen = () => {
        navigation.navigate('Onboarding_2');
    }

    return (
        <SafeAreaView style={styles.onBoardingView_1}>
            <Image source={happyEarth} style={styles.earthImage} />
            <Text style={styles.happyText_1}>Leve felicidade para o mundo</Text>
            <Text style={styles.subHappyText}>Visite orfanatos e mude o dia de muitas crianças.</Text>
            <View style={styles.happyFooter_1}>
                <View />
                <RectButton style={styles.buttonOnboard1} onPress={navigateToNextScreen}>
                    <Feather name="arrow-right" size={30} color="#15C3D6" />
                </RectButton>
            </View>
        </SafeAreaView>
    );
}