import React from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  Linking
} from 'react-native';
import {connect} from 'react-redux';

import {images, icons} from '../constants';

const Ad = ({isVisible, onClose, navigation, route, data, specification}) => {
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

  const [showFilterModal, setShowFilterModal] = React.useState(isVisible);

  React.useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [800, 0],
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      style={{flex: 1, width: '100%', height: '100%'}}>
      <View
        style={{
          flex: 1,
          // backgroundColor: '#7fffd4',
          width: '100%',
          height: '100%',
        }}>
        {/* Transparent Basckground */}
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}></View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: 'absolute',
            // left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            borderColor: '#000',
            // margin: 5,
          }}>
          <ImageBackground
            source={images.backgroundImage}
            resizeMode="stretch"
            style={styles.image}>
            <View style={{height: 50}} />
            <Text
              style={{
                fontSize: 25,
                color: '#fff',
                fontWeight: 'bold',
                fontStyle: 'italic',
                alignSelf: 'center',
              }}>
              Откройте новые возможности:
            </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', lineHeight: 30, marginLeft: 10}}>
              {('\n', '\r')}- Новые слова {'\n'} - Новые игровые задания {'\n'}{' '}
              - Проверка знаний
            </Text>
            <View style={{flex: 1, justifyContent: 'space-evenly'}}>
              {/* <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'skyblue',
                  justifyContent: 'space-between',
                  padding: 10,
                  margin: 10,
                  borderRadius: 20
                }}>
                <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
                  1 месяц
                </Text>
                <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
                  1000 тг
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'steelblue',
                  justifyContent: 'space-between',
                  padding: 10,
                  margin: 10,
                  borderRadius: 20
                }}>
                <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
                  12 месяцев
                </Text>
                <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
                  4000 тг
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'green',
                  justifyContent: 'space-between',
                  padding: 10,
                  margin: 10,
                  borderRadius: 20
                }}
                onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.Easykazakh2')}>
                <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
                  Навсегда
                </Text>
                <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
                  990 тг
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => setShowFilterModal(false)}
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
            </View>
          </ImageBackground>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

function mapStateToProps(state) {
  return {
    selectedStack: state.stackReducer.selectedStack,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: selectedStack => {
      return dispatch(selectedStack);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ad);
