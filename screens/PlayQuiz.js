import React, {Component} from 'react';
import QuizTest from '../constants/components/QuizTest';
import {StyleSheet, TouchableOpacity, View, Text, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {colors, shadow} from '../constants/theme';

class Playquiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizFinish: false,
      score: 0,
    };
  }
  _onPressBack() {
    const {goBack} = this.props.navigation;
    goBack();
  }
  _quizFinish(score) {
    this.setState({quizFinish: true, score: score});
  }
  _scoreMessage(score) {
    let title = 'Нужно ещё потренироваться';
    let tone = styles.low;
    if (score > 30 && score < 60) {
      title = 'Хороший результат';
      tone = styles.mid;
    } else if (score >= 60) {
      title = 'Отлично';
      tone = styles.high;
    }
    return (
      <View style={styles.innerContainer}>
        <Text style={[styles.resultTitle, tone]}>{title}</Text>
        <Text style={styles.score}>Результат {score}%</Text>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => this._onPressBack()}
            style={styles.back}
            accessibilityLabel="Назад">
            <Text style={styles.backLabel}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>Квиз</Text>
          <View style={styles.backSpacer} />
        </View>
        {this.state.quizFinish ? (
          <View style={styles.resultWrap}>
            <View style={styles.card}>{this._scoreMessage(this.state.score)}</View>
          </View>
        ) : (
          <QuizTest quizFinish={score => this._quizFinish(score)} />
        )}
      </SafeAreaView>
    );
  }
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
  resultWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 36,
    paddingHorizontal: 24,
    ...shadow,
  },
  innerContainer: {
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  score: {
    color: colors.muted,
    fontSize: 18,
    marginTop: 10,
  },
  low: {
    color: colors.incorrect,
  },
  mid: {
    color: colors.timeout,
  },
  high: {
    color: colors.correct,
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

export default connect(mapStateToProps, mapDispatchToProps)(Playquiz);
