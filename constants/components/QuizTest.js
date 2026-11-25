import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors, shadow} from '../theme';
// import Icon from 'react-native-vector-icons/Ionicons';
import Animbutton from './AnimButton';
const {width, height} = Dimensions.get('window');
let arrnew = [];
const jsonData = {
  quiz: {
    quiz1: {
      question1: {
        correctoption: 'option3',
        options: {
          option1: 'Java',
          option2: 'PHP',
          option3: 'Javascript',
        },
        question: 'React is a ____ library',
      },
      question2: {
        correctoption: 'option4',
        options: {
          option1: 'XML',
          option2: 'YML',
          option3: 'HTML',
          option4: 'JSX',
        },
        question: '____ tag syntax is used in React',
      },
      question3: {
        correctoption: 'option1',
        options: {
          option1: 'Single root DOM node',
          option2: 'Double root DOM node',
          option3: 'Multiple root DOM node',
          option4: 'None of the above',
        },
        question: 'Application built with just React usually have ____',
      },
      question4: {
        correctoption: 'option2',
        options: {
          option1: 'mutable',
          option2: 'immutable',
          option3: 'variable',
          option4: 'none of the above',
        },
        question: 'React elements are ____',
      },
      question5: {
        correctoption: 'option3',
        options: {
          option1: 'functions',
          option2: 'array',
          option3: 'components',
          option4: 'json data',
        },
        question:
          'React allows to split UI into independent and reusable pieses of ____',
      },
    },
  },
};
export default class QuizTest extends Component {
  constructor(props) {
    super(props);
    this.qno = 0;
    this.score = 0;

    const jdata = jsonData.quiz.quiz1;
    arrnew = Object.keys(jdata).map(function (k) {
      return jdata[k];
    });
    this.state = {
      question: arrnew[this.qno].question,
      options: arrnew[this.qno].options,
      correctoption: arrnew[this.qno].correctoption,
      countCheck: 0,
    };
  }
  prev() {
    if (this.qno > 0) {
      this.qno--;
      this.setState({
        question: arrnew[this.qno].question,
        options: arrnew[this.qno].options,
        correctoption: arrnew[this.qno].correctoption,
      });
    }
  }
  next() {
    if (this.qno < arrnew.length - 1) {
      this.qno++;

      this.setState({
        countCheck: 0,
        question: arrnew[this.qno].question,
        options: arrnew[this.qno].options,
        correctoption: arrnew[this.qno].correctoption,
      });
    } else {
      this.props.quizFinish((this.score * 100) / 5);
    }
  }
  _answer(status, ans) {
    if (status == true) {
      const count = this.state.countCheck + 1;
      this.setState({countCheck: count});
      if (ans == this.state.correctoption) {
        this.score += 1;
      }
    } else {
      const count = this.state.countCheck - 1;
      this.setState({countCheck: count});
      if (this.state.countCheck < 1 || ans == this.state.correctoption) {
        this.score -= 1;
      }
    }
  }
  render() {
    let _this = this;
    const currentOptions = this.state.options;
    const options = Object.keys(currentOptions).map(function (k) {
      return (
        <View key={k} style={{margin: 10}}>
          <Animbutton
            countCheck={_this.state.countCheck}
            onColor={'green'}
            effect={'tada'}
            _onPress={status => _this._answer(status, k)}
            text={currentOptions[k]}
          />
        </View>
      );
    });

    return (
      <ScrollView style={styles.image} contentContainerStyle={{paddingTop: 10, paddingBottom: 24}}>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={styles.oval}>
              <Text style={styles.welcome}>{this.state.question}</Text>
            </View>
            <View>{options}</View>
            <TouchableOpacity onPress={() => this.next()}>
              <View style={styles.nextButton}>
                <Text style={styles.nextLabel}>Дальше</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  oval: {
    width: (width * 90) / 100,
    borderRadius: 16,
    backgroundColor: colors.card,
    ...shadow,
  },
  nextButton: {
    marginTop: 8,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    backgroundColor: colors.accent,
  },
  nextLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 18,
    lineHeight: 26,
    margin: 16,
    color: colors.ink,
    fontWeight: '600',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    flex: 1,
  },
});
