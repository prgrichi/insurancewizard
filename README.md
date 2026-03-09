# Insurance Wizard (Nuxt)

Dieses Projekt ist eine kleine **Nuxt Fullstack-Anwendung**, die einen vereinfachten Versicherungsantrag simuliert. Nutzer können aktuell Versicherungen für **Bikes** und **Cars** durchlaufen, Optionen festlegen und dabei live den berechneten Beitrag sehen.

Das Projekt dient in erster Linie als **Lern- und Übungsprojekt**, um typische Konzepte moderner Webanwendungen mit Nuxt zu trainieren.

## Ziel des Projekts

Die Anwendung soll helfen, folgende Themen praktisch umzusetzen:

- Aufbau einer Nuxt-Anwendung
- Mehrstufige Formulare (Wizard)
- State Management mit Pinia (Composition Stores)
- Trennung von UI, Stores und Services
- Aufbau einer einfachen REST API mit `server/api`
- Dynamische Formulare (z. B. abhängige Selects)
- Einfache Business-Logik (Beitragsberechnung)

## Funktionsweise der App

Der Nutzer durchläuft je nach Produktart einen kleinen Versicherungsprozess:

1. Produktart wählen (Bike oder Car)
2. Fahrzeug auswählen (Hersteller und Modell)
3. Fahrzeugpreis angeben
4. Versicherungsoptionen wählen (z. B. Diebstahl)
5. Persönliche Daten eingeben
6. Zusammenfassung des Antrags

Aktueller Fokus im Code liegt weiterhin auf dem Bike-Flow; die Struktur ist aber auf mehrere Sparten (u. a. Cars) ausgelegt.

Während des gesamten Prozesses wird der **aktuelle Versicherungsbeitrag live im Header angezeigt** und aktualisiert sich automatisch, wenn sich relevante Angaben ändern.

## Technische Architektur (vereinfacht)

Die Anwendung ist in mehrere Ebenen aufgeteilt:

- **Pages / Components** -> UI und Formularschritte
- **Pinia Stores** -> zentraler Zustand für Versicherungsdaten
- **Services** -> Kapselung von Datenzugriffen und externer Logik
- **Server API (`server/api`)** -> einfache Endpunkte für Lookup-Daten (z. B. Hersteller/Modelle)
- **Data Layer (`server/data`)** -> statische Demo-Daten als Quelle für API-Endpunkte
