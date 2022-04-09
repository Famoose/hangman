# FWEBT HANGMAN

FWEBT, FORTGESCHRITTENE WEB-TECHNOLOGIEN, INF-W-AF004, BE-SA-1, FS22, DR. GREEVY ORLA
> AUTHORS: LUKAS NYDEGGER, ANDREA SORRENTINO

## Spielidee und Regeln

Die Spielidee beinhaltet ein einfaches und bekanntes Hangman Spiel. Dabei geht es darum so viele gesuchte Wörter wie
möglich zu erraten. Bei jedem Fehler bzw. nicht vorhandenen Buchstaben, wird der Gehängte Stück für Stück gezeichnet.
Die Zeichnung baut sich ungefähr wie folgt zusammen: Zuerst die Basis, dann der mittlere Pfosten, als nächstes die hohe
Latte, dann das Seil, der Kopf, der Brustbereich, die Arme/Hände und zum Schluss die Beine/Füsse (Wie der Gehängte
gezeichnet wird, ist von Interpretation zu Interpretation anders). Für jedes korrekt erratene Wort gibt es Punkte zu
gewinnen. Die Abwandlung dieser Idee, ist noch eine glückbasierte Mechanik hinzuzufügen in Form eines russischen
Roulettes. Dieses «Spiel» funktioniert wie folgt: Es gibt eine Revolverkammer, diese hat 6 Plätze und ein Schuss wird
zum Start des Spiels geladen und die Kammer wird zufällig oft gedreht. Jeder Spieler muss nun die Waffe rundenweise
abdrücken und wer den Schuss erwischt hat verloren. Für dieses Projekt wird die Revolverkammer allerdings nach jedem
falsch erratenen Buchstaben nicht nur abgedrückt, was bei einem Treffer ein Game Over bedeutet. Nach jeder überstandenen
Runde wird die Kammer zunehmend mit mehr Schüsse geladen. Wenn ein Wort erraten wurde, wird die Kammer wieder
zurückgesetzt und bis auf 1 Schuss geleert.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.