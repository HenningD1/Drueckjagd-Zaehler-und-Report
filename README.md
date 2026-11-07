# Drückjagd-Tagebuch als iPhone-App

Uhr bis „Hahn in Ruh“, Schusszähler, Sichtungen mit Anschussmeldung, Foto mit eingezeichnetem Fluchtweg und PDF-Bericht. Läuft nach der Installation auf dem iPhone ohne Netz.

## Inhalt dieses Ordners

| Datei | Zweck |
|---|---|
| `index.html` | Die App selbst |
| `sw.js` | Service Worker: speichert die App auf dem iPhone, damit sie offline startet |
| `manifest.webmanifest` | Name, Farben und Symbol für den Home-Bildschirm |
| `icon-*.png` | App-Symbole |

## Einrichtung auf GitHub Pages (einmalig, am PC)

1. Auf **github.com** anmelden oder kostenlos registrieren.
2. Oben rechts **+** › **New repository**. Name z. B. `drueckjagd`, Sichtbarkeit **Public** (im kostenlosen Tarif funktioniert GitHub Pages nur mit öffentlichen Repositories). Keine weiteren Häkchen nötig. **Create repository**.
3. Auf der leeren Repository-Seite den Link **uploading an existing file** anklicken.
4. Den **Inhalt** dieses Ordners hineinziehen: alle Dateien dieses Ordners (es gibt keine Unterordner). Wichtig: `index.html` muss ganz oben im Repository liegen, nicht in einem Unterordner.
5. Unten **Commit changes**.
6. Im Repository **Settings** › links **Pages**. Unter „Build and deployment“ als Source **Deploy from a branch** wählen, Branch **main** und Ordner **/ (root)**, dann **Save**.
7. Nach einigen Minuten erscheint oben die Adresse, z. B. `https://DEINNAME.github.io/drueckjagd/`.

## Installation auf dem iPhone

1. Die Adresse in **Safari** öffnen (nicht in Chrome oder in der GitHub-App).
2. Unten auf **Teilen** tippen › **Zum Home-Bildschirm** › **Hinzufügen**.
3. Die App einmal **mit Netz** über das neue Symbol öffnen und kurz warten. Dabei wird auch die PDF-Funktion gespeichert.
4. Ab jetzt startet die App auch ohne Netz.

## Daten und Sicherung

- Alle Einträge und Fotos liegen nur auf dem iPhone. Das öffentliche Repository enthält nur den Programmcode, keine Jagddaten.
- Wird die App vom Home-Bildschirm gelöscht, sind auch die Daten weg. Deshalb ab und zu in der Übersicht **Backup sichern** › **Backup teilen** › „In Dateien sichern“ (z. B. iCloud Drive).
- Daten aus der Claude-Version übernehmen: dort **Backup sichern**, dann hier **Backup laden** und die Datei auswählen.

## Updates einspielen

1. Geänderte Dateien wie in Schritt 3–5 erneut hochladen (vorhandene werden ersetzt).
2. In `sw.js` die Zeile `const VERSION = 'drueckjagd-v2';` hochzählen (`v3`, `v4`, …). Sonst behält das iPhone die alte Version.
3. Auf dem iPhone die App mit Netz öffnen, schließen und erneut öffnen.
