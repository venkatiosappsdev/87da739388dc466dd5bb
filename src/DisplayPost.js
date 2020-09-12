import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DisplayPost = ({ route, navigation }) => {
    const { data } = route.params;
    return (
        <View style={{ backgroundColor: '#dcedf2', flex: 1 }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.text}>{JSON.stringify(data)}</Text>
            </ScrollView>
        </View>
    );
};

export default DisplayPost;
const styles = StyleSheet.create({
    container: {
        margin: 25,
    },
    text: {
        fontSize: 18,
    },
});