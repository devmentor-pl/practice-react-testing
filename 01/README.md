> :star: *Jeśli będziesz mieć problem z rozwiązaniem tego zadania, poproś o pomoc na odpowiednim kanale na Slacku, tj. `s2e09-react-testing` (dotyczy [mentee](https://devmentor.pl/mentoring-javascript/)). Pamiętaj, aby treść Twojego wpisu spełniała [odpowiednie kryteria](https://devmentor.pl/jak-prosic-o-pomoc/).*

&nbsp;

# `#01` React: Testowanie


W lokalizacji `./src/components` znajdziesz komponent `<LoginForm>`, który renderuje formularz. Komponent ten jest wykorzystywany w pliku `./src/Task01.js`.

Gdy dane wpisywane do formularza są zbyt krótkie, tj. gdy ilość znaków jest mniejsza lub równa 3, rzucamy wyjątkami (błędami).

Twoim zadaniem jest obsługa tych błędów:
1. Gdy użytkownik wpisuje dane do formularza (`onChange`), a ilość wprowadzanych znaków jest mniejsza lub równa 3, wyświetlaj odpowiedni komunikat. Użyj `try...catch`.
2. Jeśli użytkownik wyśle nieprawidłowe dane (`onSubmit`), to zamiast formularza wyświetl element `<h1>` ze stosownym komunikatem. Użyj `.getDerivedStateFromError()`..

> **Uwaga:** pamiętaj, aby zainstalować wszystkie paczki zapisane w `package.json` przy pomocy `npm i`. Uruchomienie serwera jak zwykle odbywa się przez `npm start`.

&nbsp;

> :arrow_left: ~~*poprzednie zadanie*~~ | [*następne zadanie*](./../02) :arrow_right:
