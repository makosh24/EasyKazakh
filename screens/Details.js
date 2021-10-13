import React from 'react';
import {
  SafeAreaView,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

import {images, icons} from '../constants';

const Details = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={images.backgroundImage}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.container}>
          <ScrollView>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                alignSelf: 'center',
                marginTop: 20,
              }}>
              Правила
            </Text>
            <Text style={styles.text}>{route.params?.specification}</Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 50,
            height: 50,
          }}>
          <Image
            source={icons.logout}
            style={{
              width: 50,
              height: 50,
              tintColor: 'red',
            }}
          />
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: 'yellow',
    borderRadius: 15,
    height: '80%',
  },
  image: {
    flex: 1,
  },
  text: {
    margin: 15,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 17,
    textAlign: 'justify',
  },
});

export default Details;
