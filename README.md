# Insurance Wizard (Nuxt)

Dieses Projekt ist eine **Nuxt Fullstack-Anwendung**, die vereinfachte Versicherungsanträge simuliert. Nutzer können unterschiedliche Versicherungsarten durchlaufen (z. B. Fahrrad oder Kfz), ihre Daten eingeben und sehen dabei live den berechneten Versicherungsbeitrag.

Das Projekt dient als **Lern- und Übungsprojekt**, um typische Konzepte moderner Webanwendungen mit Nuxt umzusetzen und eine skalierbare Architektur für formularbasierte Prozesse zu entwickeln.

## Ziel des Projekts

Die Anwendung soll helfen, folgende Themen praktisch umzusetzen:

- Aufbau einer Nuxt Fullstack-Anwendung
- Mehrstufige Formulare (Wizard)
- State Management mit Pinia (Composition Stores)
- Trennung von UI, Stores und Services
- Aufbau einer REST API mit `server/api`
- Dynamische Formulare (z. B. abhängige Select-Felder)
- einfache Business-Logik (Beitragsberechnung)
- Erweiterbarkeit für mehrere Versicherungsarten

## Funktionsweise der App

Der Nutzer durchläuft einen Versicherungsprozess in mehreren Schritten (Wizard).
Je nach gewählter Versicherungsart unterscheiden sich die abgefragten Daten.

### Beispiel: Fahrradversicherung

1. Fahrrad auswählen (Hersteller und Modell)
2. Fahrradpreis angeben
3. Versicherungsoptionen wählen (z. B. Diebstahl)
4. Persönliche Daten eingeben
5. Zusammenfassung des Antrags

### Beispiel: Kfz-Versicherung

1. Fahrzeug auswählen (Hersteller und Modell)
2. Fahrzeugdaten angeben (z. B. Baujahr)
3. Fahrerdaten eingeben (z. B. SF-Klasse)
4. Versicherungsoptionen wählen (Haftpflicht / Kasko)
5. Zusammenfassung des Antrags

Während des gesamten Prozesses wird der **aktuelle Versicherungsbeitrag live im Header angezeigt** und aktualisiert sich automatisch, sobald sich relevante Angaben ändern.

## Technische Architektur (vereinfacht)

Die Anwendung ist in mehrere Ebenen aufgeteilt:

**UI (Pages / Components)**
Formularschritte und Darstellung der Benutzeroberfläche.

**Stores (Pinia)**
Zentraler Zustand des aktuellen Versicherungsantrags.

**Services**
Kapseln HTTP-Requests und kommunizieren mit der API.

**Server API (`/server/api`)**
Stellt Endpunkte bereit, z. B. für Lookup-Daten wie Hersteller, Modelle oder SF-Klassen.

**Daten (JSON / später Datenbank)**
Aktuell werden Beispiel-Daten aus JSON-Dateien geladen.

```
UI (Pages / Components)
        ↓
Stores (Pinia)
        ↓
Services (HTTP Requests)
        ↓
Nuxt Server API (/server/api)
        ↓
Daten (JSON / später DB)
```

## Beispiel für dynamische Formulare

Ein häufiges Pattern in der App sind **abhängige Select-Felder**.

Beispiel:

```
Hersteller auswählen
↓
Modelle für diesen Hersteller laden
```

Die Modelle werden über eine API geladen und anschließend für die UI gemappt.

## Live-Beitragsberechnung

Der Versicherungsbeitrag wird im Store als **computed Wert** berechnet.
Wenn sich Eingaben im Wizard ändern, wird der Beitrag automatisch neu berechnet und im Header angezeigt.

## Erweiterungsmöglichkeiten

Die Architektur ist so aufgebaut, dass sie leicht erweitert werden kann.

Mögliche Erweiterungen:

- weitere Versicherungsarten
- echte Datenbank statt JSON
- Authentifizierung / Benutzerkonten
- Persistente Versicherungsanträge
- komplexere Tariflogik
- Admin- oder Dashboard-Bereich

## Zweck des Projekts

Das Projekt simuliert typische Strukturen und Abläufe moderner Webanwendungen im Versicherungsbereich und dient als praktische Übung für Fullstack-Entwicklung mit Nuxt.
