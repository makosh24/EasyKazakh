import 'dart:math';

import 'package:flutter/material.dart';

import 'models.dart';
import 'theme.dart';

class QuizScreen extends StatefulWidget {
  const QuizScreen({
    super.key,
    required this.title,
    required this.questions,
  });

  final String title;
  final List<QuizQuestion> questions;

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  final _writing = TextEditingController();
  final _random = Random();

  int _index = 0;
  int _correctCount = 0;
  bool _checked = false;
  bool _wasCorrect = false;
  bool _finished = false;

  String? _selectedChoice;
  int? _selectedPrompt;
  List<String> _shuffledAnswers = const [];
  final Map<int, String> _matches = {};

  @override
  void initState() {
    super.initState();
    _prepareQuestion();
  }

  @override
  void dispose() {
    _writing.dispose();
    super.dispose();
  }

  QuizQuestion? get _question =>
      widget.questions.isEmpty ? null : widget.questions[_index];

  void _prepareQuestion() {
    _checked = false;
    _wasCorrect = false;
    _selectedChoice = null;
    _selectedPrompt = null;
    _matches.clear();
    _writing.clear();
    final question = _question;
    if (question is MatchQuestion) {
      _shuffledAnswers = question.pairs.map((pair) => pair.answer).toList()
        ..shuffle(_random);
    } else {
      _shuffledAnswers = const [];
    }
  }

  void _check() {
    final question = _question;
    if (question == null || _checked) return;
    final correct = switch (question) {
      ChoiceQuestion() => _selectedChoice == question.answer,
      MatchQuestion() => question.pairs.every(
          (pair) => _matches[question.pairs.indexOf(pair)] == pair.answer,
        ),
      WritingQuestion() => _sameText(_writing.text, question.answer),
    };
    setState(() {
      _checked = true;
      _wasCorrect = correct;
      if (correct) _correctCount += 1;
    });
  }

  void _next() {
    if (_index + 1 >= widget.questions.length) {
      setState(() => _finished = true);
      return;
    }
    setState(() {
      _index += 1;
      _prepareQuestion();
    });
  }

  bool get _canCheck {
    final question = _question;
    if (question == null || _checked) return false;
    return switch (question) {
      ChoiceQuestion() => _selectedChoice != null,
      MatchQuestion() => _matches.length == question.pairs.length,
      WritingQuestion() => _writing.text.trim().isNotEmpty,
    };
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: widget.questions.isEmpty
            ? _EmptyQuiz(title: widget.title)
            : _finished
                ? _Result(
                    correct: _correctCount,
                    total: widget.questions.length,
                  )
                : Column(
                    children: [
                      _Header(title: widget.title),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(20, 8, 20, 0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '${_index + 1} из ${widget.questions.length}',
                              style: const TextStyle(
                                color: AppColors.muted,
                                fontSize: 14,
                              ),
                            ),
                            const SizedBox(height: 8),
                            ClipRRect(
                              borderRadius: BorderRadius.circular(99),
                              child: LinearProgressIndicator(
                                minHeight: 6,
                                value: (_index + 1) / widget.questions.length,
                                backgroundColor: AppColors.line,
                                color: AppColors.accent,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Expanded(child: _buildQuestion()),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(20, 8, 20, 16),
                        child: SizedBox(
                          width: double.infinity,
                          child: FilledButton(
                            style: FilledButton.styleFrom(
                              backgroundColor: AppColors.accent,
                              disabledBackgroundColor: AppColors.line,
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(14),
                              ),
                              textStyle: const TextStyle(
                                fontSize: 17,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            onPressed: _checked
                                ? _next
                                : _canCheck
                                    ? _check
                                    : null,
                            child: Text(
                              _checked
                                  ? (_index + 1 == widget.questions.length
                                      ? 'Результат'
                                      : 'Дальше')
                                  : 'Проверить',
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
      ),
    );
  }

  Widget _buildQuestion() {
    final question = _question!;
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
      children: [
        if (_instruction(question) != null)
          Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Text(
              _instruction(question)!,
              style: const TextStyle(
                color: AppColors.muted,
                fontSize: 15,
                height: 22 / 15,
              ),
            ),
          ),
        if (_checked) _statusBanner(),
        switch (question) {
          ChoiceQuestion() => _ChoiceBody(
              question: question,
              selected: _selectedChoice,
              checked: _checked,
              onSelect: (value) {
                if (_checked) return;
                setState(() => _selectedChoice = value);
              },
            ),
          MatchQuestion() => _MatchBody(
              question: question,
              answers: _shuffledAnswers,
              matches: _matches,
              selectedPrompt: _selectedPrompt,
              checked: _checked,
              onSelectPrompt: (index) {
                if (_checked) return;
                setState(() => _selectedPrompt = index);
              },
              onSelectAnswer: (answer) {
                if (_checked || _selectedPrompt == null) return;
                setState(() {
                  _matches.removeWhere((_, value) => value == answer);
                  _matches[_selectedPrompt!] = answer;
                  _selectedPrompt = null;
                });
              },
            ),
          WritingQuestion() => _WritingBody(
              question: question,
              controller: _writing,
              checked: _checked,
              wasCorrect: _wasCorrect,
              onChanged: (_) => setState(() {}),
            ),
        },
      ],
    );
  }

  Widget _statusBanner() {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: _wasCorrect ? const Color(0xFFE5F6EC) : const Color(0xFFFDECEA),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Text(
        _wasCorrect ? 'Верно' : 'Неверно',
        style: TextStyle(
          color: _wasCorrect ? AppColors.correct : AppColors.incorrect,
          fontSize: 18,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}

String? _instruction(QuizQuestion question) {
  return switch (question) {
    ChoiceQuestion(:final instruction) => instruction,
    MatchQuestion(:final instruction) => instruction,
    WritingQuestion() => 'Напишите перевод',
  };
}

bool _sameText(String typed, String expected) {
  String norm(String value) =>
      value.trim().replaceAll(RegExp(r'\s+'), ' ').toLowerCase();
  return norm(typed) == norm(expected);
}

class _Header extends StatelessWidget {
  const _Header({required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
      child: Row(
        children: [
          CircleBackButton(onPressed: () => Navigator.pop(context)),
          Expanded(
            child: Text(
              title,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: AppColors.ink,
                fontSize: 20,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          const SizedBox(width: 40),
        ],
      ),
    );
  }
}

class _ChoiceBody extends StatelessWidget {
  const _ChoiceBody({
    required this.question,
    required this.selected,
    required this.checked,
    required this.onSelect,
  });

  final ChoiceQuestion question;
  final String? selected;
  final bool checked;
  final ValueChanged<String> onSelect;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _PromptCard(text: question.question),
        const SizedBox(height: 16),
        for (final choice in question.choices) ...[
          _ChoiceChip(
            label: choice,
            selected: selected == choice,
            correct: checked && choice == question.answer,
            wrong: checked && selected == choice && choice != question.answer,
            onTap: () => onSelect(choice),
          ),
          const SizedBox(height: 10),
        ],
      ],
    );
  }
}

class _PromptCard extends StatelessWidget {
  const _PromptCard({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(16),
        boxShadow: cardShadow,
      ),
      child: Text(
        text,
        style: const TextStyle(
          color: AppColors.ink,
          fontSize: 20,
          height: 28 / 20,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}

class _ChoiceChip extends StatelessWidget {
  const _ChoiceChip({
    required this.label,
    required this.selected,
    required this.correct,
    required this.wrong,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final bool correct;
  final bool wrong;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final Color background;
    final Color foreground;
    final Color border;
    if (correct) {
      background = const Color(0xFFE5F6EC);
      foreground = AppColors.correct;
      border = AppColors.correct;
    } else if (wrong) {
      background = const Color(0xFFFDECEA);
      foreground = AppColors.incorrect;
      border = AppColors.incorrect;
    } else if (selected) {
      background = AppColors.accent;
      foreground = Colors.white;
      border = AppColors.accent;
    } else {
      background = AppColors.card;
      foreground = AppColors.ink;
      border = AppColors.line;
    }

    return Material(
      color: background,
      borderRadius: BorderRadius.circular(14),
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: onTap,
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: border),
          ),
          child: Text(
            label,
            style: TextStyle(
              color: foreground,
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }
}

class _MatchBody extends StatelessWidget {
  const _MatchBody({
    required this.question,
    required this.answers,
    required this.matches,
    required this.selectedPrompt,
    required this.checked,
    required this.onSelectPrompt,
    required this.onSelectAnswer,
  });

  final MatchQuestion question;
  final List<String> answers;
  final Map<int, String> matches;
  final int? selectedPrompt;
  final bool checked;
  final ValueChanged<int> onSelectPrompt;
  final ValueChanged<String> onSelectAnswer;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        for (var i = 0; i < question.pairs.length; i++) ...[
          _MatchPrompt(
            prompt: question.pairs[i].prompt,
            chosen: matches[i],
            selected: selectedPrompt == i,
            correct: checked && matches[i] == question.pairs[i].answer,
            wrong: checked && matches[i] != question.pairs[i].answer,
            expected: checked ? question.pairs[i].answer : null,
            onTap: () => onSelectPrompt(i),
          ),
          const SizedBox(height: 10),
        ],
        const SizedBox(height: 8),
        const Align(
          alignment: Alignment.centerLeft,
          child: Text(
            'Варианты',
            style: TextStyle(
              color: AppColors.muted,
              fontSize: 14,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        const SizedBox(height: 8),
        for (final answer in answers)
          if (!matches.containsValue(answer) || checked) ...[
            _ChoiceChip(
              label: answer,
              selected: false,
              correct: false,
              wrong: false,
              onTap: () => onSelectAnswer(answer),
            ),
            const SizedBox(height: 10),
          ],
      ],
    );
  }
}

class _MatchPrompt extends StatelessWidget {
  const _MatchPrompt({
    required this.prompt,
    required this.chosen,
    required this.selected,
    required this.correct,
    required this.wrong,
    required this.expected,
    required this.onTap,
  });

  final String prompt;
  final String? chosen;
  final bool selected;
  final bool correct;
  final bool wrong;
  final String? expected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: AppColors.card,
      borderRadius: BorderRadius.circular(16),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: onTap,
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: correct
                  ? AppColors.correct
                  : wrong
                      ? AppColors.incorrect
                      : selected
                          ? AppColors.accent
                          : AppColors.line,
              width: selected ? 2 : 1,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                prompt,
                style: const TextStyle(
                  color: AppColors.ink,
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                chosen ?? 'Выберите пару',
                style: TextStyle(
                  color: chosen == null ? AppColors.muted : AppColors.accent,
                  fontSize: 15,
                ),
              ),
              if (wrong && expected != null) ...[
                const SizedBox(height: 4),
                Text(
                  'Верно: $expected',
                  style: const TextStyle(
                    color: AppColors.correct,
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _WritingBody extends StatelessWidget {
  const _WritingBody({
    required this.question,
    required this.controller,
    required this.checked,
    required this.wasCorrect,
    required this.onChanged,
  });

  final WritingQuestion question;
  final TextEditingController controller;
  final bool checked;
  final bool wasCorrect;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _PromptCard(text: question.question),
        const SizedBox(height: 16),
        TextField(
          controller: controller,
          enabled: !checked,
          onChanged: onChanged,
          style: const TextStyle(color: AppColors.ink, fontSize: 16),
          decoration: InputDecoration(
            hintText: 'Ваш ответ',
            filled: true,
            fillColor: AppColors.card,
            contentPadding: const EdgeInsets.all(16),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14),
              borderSide: const BorderSide(color: AppColors.line),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14),
              borderSide: const BorderSide(color: AppColors.line),
            ),
          ),
        ),
        if (checked && !wasCorrect) ...[
          const SizedBox(height: 12),
          Text(
            'Верно: ${question.answer}',
            style: const TextStyle(
              color: AppColors.correct,
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ],
    );
  }
}

class _Result extends StatelessWidget {
  const _Result({required this.correct, required this.total});

  final int correct;
  final int total;

  @override
  Widget build(BuildContext context) {
    final percent = total == 0 ? 0 : (correct * 100 / total).round();
    final great = percent > 70;
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          const Spacer(),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 36),
            decoration: BoxDecoration(
              color: AppColors.card,
              borderRadius: BorderRadius.circular(16),
              boxShadow: cardShadow,
            ),
            child: Column(
              children: [
                Text(
                  great ? 'Отлично' : 'Нужно стараться больше',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: great ? AppColors.correct : AppColors.incorrect,
                    fontSize: 26,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  great
                      ? 'У вас отличный результат'
                      : 'Повторите урок и попробуйте снова',
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    color: AppColors.muted,
                    fontSize: 16,
                    height: 24 / 16,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Результат $percent%',
                  style: const TextStyle(color: AppColors.muted, fontSize: 18),
                ),
              ],
            ),
          ),
          const Spacer(),
          SizedBox(
            width: double.infinity,
            child: FilledButton(
              style: FilledButton.styleFrom(
                backgroundColor: AppColors.accent,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              onPressed: () => Navigator.pop(context),
              child: const Text(
                'К урокам',
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _EmptyQuiz extends StatelessWidget {
  const _EmptyQuiz({required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _Header(title: title),
        const Expanded(
          child: Center(
            child: Text(
              'В этом разделе пока нет заданий',
              style: TextStyle(color: AppColors.muted, fontSize: 16),
            ),
          ),
        ),
      ],
    );
  }
}
