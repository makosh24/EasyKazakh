import React from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import {colors, shadow} from '../constants/theme';

const FilterModal = ({
  isVisible,
  onClose,
  navigation,
  data,
  specification,
}) => {
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [showFilterModal, setShowFilterModal] = React.useState(isVisible);

  React.useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start(() => onClose());
    }
  }, [showFilterModal, modalAnimatedValue, onClose]);

  const translateY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [420, 0],
  });

  const go = (name, params) => {
    setShowFilterModal(false);
    navigation.navigate({
      name,
      params,
      merge: true,
    });
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={styles.root}>
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View style={styles.scrim} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.sheet, {transform: [{translateY}]}]}>
          <View style={styles.handle} />
          <Text style={styles.title}>{data?.title || 'Урок'}</Text>
          <Text style={styles.hint}>Выберите, с чего начать</Text>
          <TouchableOpacity
            style={styles.primary}
            onPress={() => go('Quiz', {data: data.data})}>
            <Text style={styles.primaryLabel}>Тренажёр</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondary}
            onPress={() => go('Quiz', {data: data.words})}>
            <Text style={styles.secondaryLabel}>Слова</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondary}
            onPress={() => go('Details', {specification})}>
            <Text style={styles.secondaryLabel}>Правила</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.close}
            onPress={() => setShowFilterModal(false)}>
            <Text style={styles.closeLabel}>Закрыть</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.scrim,
  },
  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    ...shadow,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
    marginBottom: 16,
  },
  title: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  hint: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
    marginBottom: 18,
  },
  primary: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryLabel: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  secondary: {
    backgroundColor: colors.background,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryLabel: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '600',
  },
  close: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  closeLabel: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '600',
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
