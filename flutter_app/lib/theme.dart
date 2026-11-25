import 'package:flutter/material.dart';

class AppColors {
  static const background = Color(0xFFF6F3EC);
  static const card = Color(0xFFFFFFFF);
  static const ink = Color(0xFF1C2B4A);
  static const muted = Color(0xFF5C6B85);
  static const accent = Color(0xFF00A3C8);
  static const gold = Color(0xFFC4A35A);
  static const line = Color(0xFFE6E0D4);
  static const correct = Color(0xFF1F8A4C);
  static const incorrect = Color(0xFFC4473A);
  static const badge = Color(0xFFE6F6FA);
}

const cardShadow = [
  BoxShadow(
    color: Color(0x141C2B4A),
    blurRadius: 16,
    offset: Offset(0, 8),
  ),
];

class CircleBackButton extends StatelessWidget {
  const CircleBackButton({super.key, required this.onPressed});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: AppColors.card,
      shape: const CircleBorder(),
      elevation: 2,
      shadowColor: const Color(0x141C2B4A),
      child: InkWell(
        customBorder: const CircleBorder(),
        onTap: onPressed,
        child: const SizedBox(
          width: 40,
          height: 40,
          child: Center(
            child: Text(
              '‹',
              style: TextStyle(
                color: AppColors.ink,
                fontSize: 28,
                height: 1,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
