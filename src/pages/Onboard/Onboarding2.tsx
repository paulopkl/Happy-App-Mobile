import React from 'react';

import { SafeAreaView, Text, Image, StyleSheet } from 'react-native';

import happyEarth from '../../images/happyEarth.png';

export default function Onboarding1() {

    return (
        <SafeAreaView style={styles.onBoardingView}>
            <Image source={happyEarth} />
            <Text style={styles.happyText}>Leve felicidade para o mundo</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    onBoardingView: {

    },

    happyText: {
        fontSize: 48,
        color: '#0089A5'
    }
});