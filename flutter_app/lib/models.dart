import 'dart:convert';

import 'package:flutter/services.dart';

class Lesson {
  const Lesson({
    required this.id,
    required this.title,
    required this.specification,
    required this.practice,
    required this.words,
  });

  final String id;
  final String title;
  final List<String> specification;
  final List<QuizQuestion> practice;
  final List<QuizQuestion> words;

  static Lesson fromJson(Map<String, dynamic> json) {
    return Lesson(
      id: '${json['id']}',
      title: json['title'] as String? ?? '',
      specification: (json['specification'] as List<dynamic>? ?? [])
          .map((line) => '$line')
          .toList(),
      practice: _questions(json['data']),
      words: _questions(json['words']),
    );
  }
}

List<QuizQuestion> _questions(dynamic raw) {
  if (raw is! List) return const [];
  return raw
      .whereType<Map<String, dynamic>>()
      .map(QuizQuestion.fromJson)
      .whereType<QuizQuestion>()
      .toList();
}

sealed class QuizQuestion {
  const QuizQuestion();

  static QuizQuestion? fromJson(Map<String, dynamic> json) {
    switch (json['questionType']) {
      case 'MultipleChoice':
        return ChoiceQuestion(
          question: json['question'] as String? ?? '',
          answer: json['answer'] as String? ?? '',
          choices: (json['allChoices'] as List<dynamic>? ?? [])
              .map((choice) => '$choice')
              .toList(),
          instruction: json['instructionText'] as String?,
        );
      case 'Matching':
        final pairs = (json['questionAnswerPairs'] as List<dynamic>? ?? [])
            .whereType<Map<String, dynamic>>()
            .map(
              (pair) => MatchPair(
                prompt: pair['question'] as String? ?? '',
                answer: pair['answer'] as String? ?? '',
              ),
            )
            .toList();
        return MatchQuestion(
          pairs: pairs,
          instruction: json['instructionText'] as String?,
        );
      case 'Writing':
        return WritingQuestion(
          question: json['question'] as String? ?? '',
          answer: json['answer'] as String? ?? '',
        );
      default:
        return null;
    }
  }
}

class ChoiceQuestion extends QuizQuestion {
  const ChoiceQuestion({
    required this.question,
    required this.answer,
    required this.choices,
    this.instruction,
  });

  final String question;
  final String answer;
  final List<String> choices;
  final String? instruction;
}

class MatchPair {
  const MatchPair({required this.prompt, required this.answer});

  final String prompt;
  final String answer;
}

class MatchQuestion extends QuizQuestion {
  const MatchQuestion({required this.pairs, this.instruction});

  final List<MatchPair> pairs;
  final String? instruction;
}

class WritingQuestion extends QuizQuestion {
  const WritingQuestion({required this.question, required this.answer});

  final String question;
  final String answer;
}

Future<List<Lesson>> loadLessons() async {
  final raw = await rootBundle.loadString('assets/data.json');
  final json = jsonDecode(raw) as Map<String, dynamic>;
  final movies = json['movies'] as List<dynamic>? ?? [];
  return movies
      .whereType<Map<String, dynamic>>()
      .map(Lesson.fromJson)
      .toList();
}

List<String> lessonParagraphs(List<String> specification) {
  return specification
      .join('\n')
      .split(RegExp(r'\r?\n'))
      .map((line) => line.trim())
      .where((line) => line.isNotEmpty)
      .toList();
}
