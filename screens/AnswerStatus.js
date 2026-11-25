import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {scale, moderateScale} from '../Scaling';
import {colors} from '../constants/theme';

const CORRECT_ANIMATION = require('../assets/animations/433-checked-done.json');
const INCORRECT_ANIMATION = require('../assets/animations/101-x-pop.json');
const TIMEOUT_ANIMATION = require('../assets/animations/4284-notification.json');

const propTypes = {
  type: PropTypes.oneOf(['correct', 'incorrect', 'timeout']).isRequired,
};

class AnswerStatus extends React.Component {
  render() {
    let animation;
    let statusMessage;
    let statusStyle;
    switch (this.props.type) {
      case 'correct':
        animation = CORRECT_ANIMATION;
        statusMessage = 'Верно';
        statusStyle = styles.correctText;
        break;
      case 'incorrect':
        animation = INCORRECT_ANIMATION;
        statusMessage = 'Неверно';
        statusStyle = styles.errorText;
        break;
      default:
        statusMessage = 'Время вышло';
        statusStyle = styles.timeoutText;
        animation = TIMEOUT_ANIMATION;
    }

    return (
      <View style={styles.statusContainer}>
        <LottieView
          style={styles.statusAnimation}
          source={animation}
          autoPlay
          loop={false}
        />
        <Text style={[styles.statusText, statusStyle]}>{statusMessage}</Text>
        <Text style={styles.tapHint}>Нажмите, чтобы продолжить</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(246, 243, 236, 0.96)',
  },
  statusAnimation: {
    width: scale(220),
    height: scale(220),
  },
  statusText: {
    fontSize: moderateScale(32),
    fontWeight: '700',
    marginTop: moderateScale(-24),
  },
  tapHint: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 15,
  },
  correctText: {
    color: colors.correct,
  },
  errorText: {
    color: colors.incorrect,
  },
  timeoutText: {
    color: colors.timeout,
  },
});

AnswerStatus.propTypes = propTypes;

export default AnswerStatus;
