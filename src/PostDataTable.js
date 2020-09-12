import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DisplayData = props => {
    return (
        <View style={styles.container}>
            <View style={styles.data}>
                <Text style={styles.heading}>Title: {' '}</Text>
                <Text style={styles.content}>{props.title}</Text>
            </View>
            <View style={styles.data}>
                <Text style={styles.heading}>URL:{' '}</Text>
                <Text style={styles.content}>{props.URL}</Text>
            </View>
            <View style={styles.data}>
                <Text style={styles.heading}>Created At :{' '}</Text>
                <Text style={styles.content}>{props.created_at}</Text>
            </View>
            <View style={styles.data}>
                <Text style={styles.heading}>Author :{' '}</Text>
                <Text style={styles.content}>{props.author}</Text>
            </View>
        </View>
    );
};

export default DisplayData;
const styles = StyleSheet.create({
    container: {
        // borderColor: '#1ea2c9',
        // borderWidth: 1,
        // borderRadius: 25,
        margin: 8,
        padding: 8,
    },
    data: {
        flexDirection: 'row',
        margin: 5,
    },
    heading: {
        fontSize: 18,
    },
    content: {
        fontSize: 16,
        flexShrink: 1,
        color: 'black'
    },
});