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
} from 'react-native';
import {connect} from 'react-redux';

import {images, icons} from '../constants';

const FilterModal = ({
  isVisible,
  onClose,
  navigation,
  route,
  data,
  specification,
}) => {
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
    outputRange: [800, 200],
  });

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          // backgroundColor: '#7fffd4',
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
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            borderWidth: 2,
            borderColor: '#000',
          }}>
          <ImageBackground
            source={images.backgroundImage}
            resizeMode="cover"
            style={styles.image}>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.top}
                onPress={() => {
                  setShowFilterModal(false),
                    navigation.navigate({
                      name: 'Quiz',
                      params: {data: data.data},
                      merge: true,
                    });
                }}>
                <Text style={{fontSize: 30}}>Tренажер</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.middle}
                onPress={() => {
                  setShowFilterModal(false),
                  navigation.navigate({
                    name: 'Quiz',
                    params: {data: data.words},
                    merge: true,
                  });
                }}>
                <Text style={{fontSize: 30}}>Слова</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottom}
                onPress={() => {
                  setShowFilterModal(false),
                    navigation.navigate({
                      name: 'Details',
                      params: {specification: specification},
                      merge: true,
                    });
                }}>
                <Text style={{fontSize: 30}}>Правила</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={{ alignItems: 'center'}}>
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
                  tintColor: 'red'
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{height: 200}} />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  top: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#daa520',
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#daa520',
    borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#daa520',
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image: {
    flex: 1,
    padding: 12,
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
