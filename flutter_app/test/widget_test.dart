import 'package:flutter_test/flutter_test.dart';
import 'package:easykazakh/main.dart';

void main() {
  testWidgets('home lists the first lesson', (tester) async {
    await tester.pumpWidget(const EasyKazakhApp());
    await tester.pump();
    await tester.pump(const Duration(seconds: 1));

    expect(find.text('Қазақша'), findsOneWidget);
    expect(find.text('Н или Ң'), findsOneWidget);
  });
}
