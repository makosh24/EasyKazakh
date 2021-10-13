import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  MatchingQuestion,
  MultipleChoiceQuestion,
  QuizContainer,
  WritingQuestion,
} from 'react-native-quiz-maker';
import {images, icons} from '../constants';
import AnswerStatus from './AnswerStatus';


function Quiz({navigation, route}) {
  const [answerStatus, setAnswerStatus] = React.useState(null);
  const [isCorrect1, setIsCorrect1] = React.useState(null);

  React.useEffect(() => {
    // console.log(answerStatus);
  }, [answerStatus]);
  return (
    <View style={styles.container}>
      {answerStatus && (
        <View style={styles.answerStatus}>
          <TouchableOpacity
            style={{flex: 1}}
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
      <ImageBackground
        source={images.backgroundImage}
        resizeMode="stretch"
        style={styles.image}>
        {/* <MatchingQuestion questionAnswerPairs = {[
        {answer: 'hello', question: 'goodbye'},
        {answer: 'see ya', question: 'be ya'},
        {answer: 'mia', question: 'pia'}
        ]} 
        onSubmit={()=>console.log('submit')}
        onContinue={()=>console.log('continue')}
        instructionText='please answer'
        isActiveQuestion={true}
        />
      <MultipleChoiceQuestion
        question="How much does an apple cost?"
        answer="$15.99"
        allChoices={['$15.99', '$1.00', '$9.99']}
        onSubmit={() => console.log('submit')}
        onContinue={() => console.log('continue')}
        instructionText="please answer"
        isActiveQuestion={true}
      /> */}
        {/* <QuizContainer
        questions={[
          {
            questionType: 'Writing',
            question:
              'What is the last name of The United States of Americas first President?',
            answer: 'Washington',
            headerContainerStyle: {backgroundColor: 'red'}
          },
          {
            questionType: 'MultipleChoice',
            question: 'What is 5 x 10 + 30?',
            answer: '80',
            allChoices: ['54', '85', '80'],
            // instructionText: 'Press on or drag the best answer to place',
          },
          {
            questionType: 'Matching',
            questionAnswerPairs: [
              {
                answer: ' Equilateral',
                question: 'Three sides of equal length',
              },
              {
                answer: 'Acute',
                question: 'Three angles less than 90 degrees',
              },
              {
                answer: 'Obtuse',
                question: 'One angle greater than 90 degrees',
              },
              { answer: 'Isosceles', question: 'Two sides of equal length' },
            ],
            instructionText:
              'Match the definition with the appropriate triangle',
          },
        ]}
        onSubmit={(isCorrect: boolean) => console.log(isCorrect)}
        onComplete={(progress: number) => console.log('score: ', progress)}        
      /> */}

        {/* <WritingQuestion 
        question='How many apples are in a dozen?'
        answer='12'
        onSubmit={() => console.log('submit')}
        onContinue={() => console.log('continue')}
        instructionText="please answer"
        isActiveQuestion={true}
      /> */}

        <QuizContainer
          questions={route.params?.data}
          onSubmit={(isCorrect: boolean) => [
            setIsCorrect1(isCorrect),
            setAnswerStatus(true),
          ]}
          onComplete={(progress: number) =>{
            if(progress>70) {
              alert("У вас отличный результат")
            } else {
              alert("Нужно стараться больше")
            }
            navigation.goBack();
          }
          }
          continueLabelStyle={{
            fontSize: 20,
            color: '#000',
            fontWeight: '500'
          }}
          continueButtonStyle={{
            backgroundColor: 'green',
            borderColor: 'blue',
            borderWidth: 1
          }}
        />

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  textStyle: {
    fontSize: 40,
    color: 'red',
  },
  answerStatus: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
});

export default Quiz;
