import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
} from '@react-native-firebase/admob';

// InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

// RewardedAd.createForAdRequest(TestIds.REWARDED);

import FilterModal from './FilterModal';
import Ad from './Ad';
import {images} from '../constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({navigation, route}) => {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [quiz, setQuiz] = React.useState([]);
  const [specification, setSpecification] = React.useState('');
  const [ad, setAd] = React.useState(false);
  const [showFilterModal, setShowFilterModal] = React.useState(false);

  const getMovies = async () => {
    try {
      const response = await fetch('https://nurimbagim.kz/data.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.backgroundImage}
        resizeMode="cover"
        style={styles.image}>
        {/* AD */}
        {ad && (
           <Ad
           isVisible={ad}
           onClose={() => setAd(false)}
           navigation={navigation}
           route={route}
           data={quiz}
           specification={specification}
         />
        )}
        {/* Filter */}
        {showFilterModal && (
          <FilterModal
            isVisible={showFilterModal}
            onClose={() => setShowFilterModal(false)}
            navigation={navigation}
            route={route}
            data={quiz}
            specification={specification}
          />
        )}
        {/* <BannerAd unitId={TestIds.BANNER} /> */}
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 40,
            color: 'darkred',
            marginTop: 100,
            fontWeight: 'bold',
          }}>
          {'\r\r\r'}"EASY" {'\n'}казахский
        </Text>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#00ff00"
            style={{marginTop: 200}}
          />
        ) : (
          <FlatList
            horizontal
            data={data}
            keyExtractor={item => `${item.id}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 30,
              marginBottom: 20,
            }}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  marginLeft: 20,
                  marginRight: index == data.length - 1 ? 20 : 0,
                  borderWidth: 5,
                  alignSelf: 'flex-end',
                  borderRadius: (windowWidth * 0.8) / 2,
                  borderColor: '#7fff00',
                  width: windowWidth * 0.8,
                  height: windowWidth * 0.75,
                  backgroundColor: '#ffd700',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 50,
                }}
                onPress={() => {
                  // free
                  if(item.id < 4) {
                    setShowFilterModal(!showFilterModal),
                    setQuiz(item),
                    setSpecification(item.specification);
                  } else {
                    setAd(true);
                  }

                  // cheap
                  // setShowFilterModal(!showFilterModal),
                  // setQuiz(item),
                  // setSpecification(item.specification);
                }}>
                <Text style={{fontSize: 25, fontWeight: '700', margin: 7}}>
                  {item.title}
                </Text>
                <Text>{item.releaseYear}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});

export default Home;
