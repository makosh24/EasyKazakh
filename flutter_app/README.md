# EasyKazakh

Уроки казахского языка: произношение и грамматика.

Google Play: https://play.google.com/store/apps/details?id=com.easykazakh

## О приложении

EasyKazakh помогает различать похожие звуки и буквы казахского языка и тренировать грамматику. Уроки идут списком. В каждом есть три режима:

- **Тренажёр** — вопросы по уроку
- **Слова** — пары «русский — казахский»
- **Правила** — короткое объяснение

Примеры тем: Н и Ң, Қ и К, Ұ и Ү, вспомогательные глаголы тұр / жүр / отыр / жатыр, члены предложения.

Приложение работает офлайн: уроки лежат в `assets/data.json`.

## Политика конфиденциальности

Короткий текст для Google Play и App Store лежит в `privacy.txt`. Его публикуют по ссылке и вставляют эту ссылку в карточку. Приложение не собирает данные, аккаунта и рекламы нет.

## Текст для App Store и Google Play

Вставить в карточку как есть. В описании не писать про подпись, `Info.plist` и сборку: это не для пользователя.

### Краткое описание

```
Уроки казахского языка: звуки, слова и грамматика. Без интернета и без аккаунта.
```

### Description

```
EasyKazakh — уроки казахского языка для тех, кто путает похожие буквы и звуки.

Откройте урок и выберите режим. Тренажёр проверяет, как вы различаете звуки и формы. Слова показывают пары на русском и казахском. Правила коротко объясняют, почему написание и произношение именно такие.

В курсе есть Н и Ң, Қ и К, А и Ә, Ы и І, Ө и О, Ұ и Ү, Ғ и Г, вспомогательные глаголы тұр, жүр, отыр, жатыр и члены предложения.

Интернет для уроков не нужен. Аккаунт не нужен. Рекламы нет, данные не собираются.
```

### What’s New

```
Уроки собраны в одном списке: тренажёр, слова и правила. Обновлены экраны и иконка.
```

### App Review Information

Эти поля видит только ревьюер. Вход не включайте: аккаунта нет.

| Поле | Что вписать |
|---|---|
| Sign-in required | выключено |
| First name | Madi |
| Last name | Yedenbay |
| Phone number | свой номер в международном виде, например `+7…` |
| Email | MEdenbai@gmail.com |
| Privacy Policy URL | ссылка на опубликованный `privacy.txt` |

Notes:

```
EasyKazakh (com.easykazakh) teaches Kazakh sounds and grammar. The interface is Russian. It works offline.

No account, login, ads, in-app purchases, or subscriptions. Sign-in required should stay off. The app does not collect personal data.

How to review:
1. Launch the app. The home screen lists lessons such as Н или Ң.
2. Tap a lesson. A sheet offers three actions: Тренажёр (practice questions), Слова (word pairs), and Правила (a short explanation).
3. Open Тренажёр, answer a question, and continue. Open Правила to read the explanation, then go back.
4. No network request is required for these steps.
```

## Сборка

Нужны Flutter 3 и Xcode, если собираете iOS.

```bash
cd flutter_app
flutter pub get
flutter run
```

Релиз Android подписывается ключом `android/easyKazakh.keystore` (алиас `easyKazakh`). Пароль лежит в `android/key.properties`, этот файл и сам keystore в git не попадают.

```bash
flutter build appbundle
```

Файл: `build/app/outputs/bundle/release/app-release.aab`.

Релиз iOS подписывается командой Apple `383RYG87FH`. Сертификат Apple Distribution уже стоит в Связке ключей этого Mac, отдельный файл вроде Android keystore для iOS не нужен. Идентификатор приложения: `com.easykazakh`.

```bash
flutter build ipa --export-options-plist=ios/ExportOptions.plist
```

Файл: `build/ios/ipa/*.ipa`. Его загружают в App Store Connect через Transporter или Xcode. В старом React Native-проекте в репозитории остался шаблонный идентификатор `org.reactjs.native.example.EasyKazakh`. Если приложение уже выходило в App Store с другим id, в Flutter нужно поставить тот же.

Идентификатор Android в этом проекте: `com.easykazakh`. В старом приложении в Gradle указан `com.Easykazakh2`. Чтобы обновление встало в ту же карточку Google Play, идентификатор должен совпасть с уже опубликованным.
