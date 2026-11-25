import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {QuizContainer} from 'react-native-quiz-maker';
import AnswerStatus from './AnswerStatus';
import {colors, shadow} from '../constants/theme';

function Quiz({navigation, route}) {
  const [answerStatus, setAnswerStatus] = React.useState(null);
  const [isCorrect1, setIsCorrect1] = React.useState(null);

  return (
    <SafeAreaView style={styles.screen}>
      {answerStatus && (
        <View style={styles.answerStatus}>
          <TouchableOpacity
            style={styles.answerTap}
            onPress={() => setAnswerStatus(false)}>
            <AnswerStatus
              type={
                isCorrect1 === null
                  ? 'timeout'
                  : isCorrect1
                  ? 'correct'
                  : 'incorrect'
              }
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
          accessibilityLabel="Назад">
          <Text style={styles.backLabel}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Тренажёр</Text>
        <View style={styles.backSpacer} />
      </View>
      <View style={styles.quiz}>
        <QuizContainer
          questions={route.params?.data}
          onSubmit={(isCorrect: boolean) => {
            setIsCorrect1(isCorrect);
            setAnswerStatus(true);
          }}
          onComplete={(progress: number) => {
            if (progress > 70) {
              alert('У вас отличный результат');
            } else {
              alert('Нужно стараться больше');
            }
            navigation.goBack();
          }}
          continueLabelStyle={styles.continueLabel}
          continueButtonStyle={styles.continueButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  backSpacer: {
    width: 40,
    height: 40,
  },
  backLabel: {
    color: colors.ink,
    fontSize: 28,
    lineHeight: 32,
    marginTop: -2,
  },
  heading: {
    flex: 1,
    textAlign: 'center',
    color: colors.ink,
    fontSize: 20,
    fontWeight: '700',
  },
  quiz: {
    flex: 1,
    paddingHorizontal: 8,
  },
  continueButton: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    borderWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  continueLabel: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  answerStatus: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  answerTap: {
    flex: 1,
  },
});

export default Quiz;
