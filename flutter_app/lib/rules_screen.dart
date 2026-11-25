import 'package:flutter/material.dart';

import 'models.dart';
import 'theme.dart';

class RulesScreen extends StatelessWidget {
  const RulesScreen({super.key, required this.specification});

  final List<String> specification;

  @override
  Widget build(BuildContext context) {
    final paragraphs = lessonParagraphs(specification);
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
              child: Row(
                children: [
                  CircleBackButton(onPressed: () => Navigator.pop(context)),
                  const Expanded(
                    child: Text(
                      'Правила',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: AppColors.ink,
                        fontSize: 20,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  const SizedBox(width: 40),
                ],
              ),
            ),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.fromLTRB(20, 12, 20, 24),
                children: [
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: AppColors.card,
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: cardShadow,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        for (final paragraph in paragraphs)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 14),
                            child: Text(
                              paragraph,
                              style: _isNote(paragraph)
                                  ? const TextStyle(
                                      color: AppColors.gold,
                                      fontSize: 15,
                                      height: 22 / 15,
                                      fontWeight: FontWeight.w700,
                                    )
                                  : const TextStyle(
                                      color: AppColors.ink,
                                      fontSize: 16,
                                      height: 24 / 16,
                                    ),
                            ),
                          ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  bool _isNote(String paragraph) {
    return paragraph.endsWith('!') && paragraph.length < 24;
  }
}
