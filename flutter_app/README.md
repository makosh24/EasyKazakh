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

### Keywords

Поле App Store, не больше 100 символов. Пробелов после запятых нет. Название EasyKazakh вписывать не нужно: магазин и так учитывает имя приложения.

```
казахский,язык,грамматика,произношение,слова,уроки,алфавит,ң,ә,қ,ү,тренажер,қазақша,обучение,правила
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

Релиз iOS подписывается командой Apple `383RYG87FH`. Сертификат Apple Distribution уже стоит в Связке ключей этого Mac. Идентификатор приложения: `com.easykazakh`. В карточке App Store Connect нужно создать приложение с этим же Bundle ID. Шифрование в приложении только стандартное HTTPS, поэтому в `Info.plist` указано `ITSAppUsesNonExemptEncryption` = false: при загрузке отдельный вопрос про экспортное шифрование не задаётся.

```bash
flutter build ipa --export-options-plist=ios/ExportOptions.plist
```

Файл: `build/ios/ipa/*.ipa`. Его загружают в App Store Connect через Transporter или Xcode. Версия берётся из `pubspec.yaml`: сейчас `1.8.0`, номер сборки `8`.

## Скриншоты

Пять кадров лежат в четырёх размерах. Приложение портретное, поэтому и кадры портретные. Загружайте папку целиком, по порядку от `01` до `05`. Экран не обрезан: если пропорция слота другая, по краям поле цвета фона `#F6F3EC`.

- App Store, iPhone 6,9 дюйма: `docs/store/ios/iphone-6.9`, 1320×2868.
- App Store, iPhone 6,3 дюйма: `docs/store/ios/iphone-6.3`, 1206×2622. Этот размер принимается и в слот 6,1 дюйма.
- App Store, iPhone Duo, внутренний экран: `docs/store/ios/iphone-duo`, 2007×2853.
- App Store, iPad 13 дюймов: `docs/store/ios/ipad-13`, 2064×2752. Нужен, потому что сборка открывается и на iPad.

Порядок: главный экран, выбор режима урока, тренажёр, слова, правила.

Исходники были около 626×1280, поэтому на iPad по бокам больше поля, чем на iPhone.

Шапка страницы в App Store: `docs/store/ios/header/header-3840x1646.png`, 3840×1646. Её перетаскивают в поле Header Asset. Название и знак стоят в центре, где витрина их не обрезает.

Картинка для поиска в App Store: `docs/store/ios/search/search-3840x2560.png`, 3840×2560. Её перетаскивают в поле Search Results Asset.

Идентификатор Android в этом проекте: `com.easykazakh`. В старом приложении в Gradle указан `com.Easykazakh2`. Чтобы обновление встало в ту же карточку Google Play, идентификатор должен совпасть с уже опубликованным.
