import 'package:flutter/material.dart';

import 'home_screen.dart';
import 'models.dart';
import 'theme.dart';

void main() {
  runApp(const EasyKazakhApp());
}

class EasyKazakhApp extends StatelessWidget {
  const EasyKazakhApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'EasyKazakh',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: AppColors.background,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.accent,
          primary: AppColors.accent,
          surface: AppColors.background,
        ),
        fontFamily: 'Roboto',
      ),
      home: const _LessonLoader(),
    );
  }
}

class _LessonLoader extends StatefulWidget {
  const _LessonLoader();

  @override
  State<_LessonLoader> createState() => _LessonLoaderState();
}

class _LessonLoaderState extends State<_LessonLoader> {
  late final Future<List<Lesson>> _lessons = loadLessons();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Lesson>>(
      future: _lessons,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return const Scaffold(
            backgroundColor: AppColors.background,
            body: Center(
              child: Text(
                'Не удалось открыть уроки',
                style: TextStyle(color: AppColors.ink, fontSize: 16),
              ),
            ),
          );
        }
        if (!snapshot.hasData) {
          return const Scaffold(
            backgroundColor: AppColors.background,
            body: Center(
              child: CircularProgressIndicator(color: AppColors.accent),
            ),
          );
        }
        return HomeScreen(lessons: snapshot.data!);
      },
    );
  }
}
