# Crea il diario di viaggio delle tue vacanze estive

## Obiettivo

- Compiere delle scelte progettuali e saperle motivare, documentare e presentare (comprese eventuali criticità emerse).

## Traccia

- Sviluppa una Web App per la pianificazione e gestione del tuo viaggio. Suddividi il viaggio in giornate in cui ogni giornata riporta le tappe da visitare.
- Inserisci dettagli (titolo, descrizione, data etc), immagini, cibo, curiosità o qualsiasi altra info.
- Le tappe del viaggio saranno anche visualizzate su mappa tramite un servizio a tua scelta.

- Implementa una funzionalità per tenere traccia della progressione delle tappe del tuo viaggio (anche quando chiudi la pagina).
- Aggiungi personalizzazioni e funzionalità a tuo piacimento. Alcuni esempi:
  - aprire dettaglio viaggio o immagini in una modale
  - possibilità di aggiungere note a una tappa durante il viaggio
  - possibilità di inserire una valutazione (ad es. da 1 a 5 stelle) su una tappa
- Carica il codice su un servizio di hosting a tua scelta per condividere l’app.

## Milestone

- Progettazione e pianificazione

  - Definire i requisiti funzionali e non funzionali dell'app e creare un wireframe dell'interfaccia utente. Progettare una soluzione tecnologica adeguata. Pianificare le attività da svolgere per arrivare alla deadline.

- Setup ambiente e progetto

  - Configurare l’ambiente di sviluppo se necessario e definire un setup di progetto (strumenti, build tools, git etc..). Inizializzare il progetto.

- Definizione di uno stato (struttura dei dati)

  - Definire la struttura dati idonea a rappresentare un viaggio e tutti i suoi dettagli, nonché le scelte e i dati inseriti dall’utente.

- Sviluppo layout e componenti UI

  - Sviluppo della struttura di layout e dei componenti della pagina.

- Logica applicativa

  - Logica di render dell’interfaccia a partire dal dato strutturato. Aggiungi le varie modalità di visualizzazione e interazioni.

- Persistenza

  - Implementare la funzionalità per salvare la progressione delle tappe (es. LocalStorage o backend) e garantire che i dati siano mantenuti anche dopo la chiusura della pagina.

- Deployment

  - Caricare il codice su un servizio di hosting a tua scelta (Netlify, Vercel, Heroku, ecc.).

- Documentazione
  - Scrivere un README da aggiungere alla repository per documentare requisiti, installazione e funzionalità.

## Bonus

- Più viaggi! (BONUS 1)

  - Visualizzare più di un viaggio selezionandoli da un menu.

- (BONUS 2)
  - Integra alcune funzionalità che caratterizzano una Progressive Web Application e che rendono la tua app simile a un’app nativa! Abbiamo parlato di questo durante una masterclass sulle PWA (Progressive Web Apps).

## TODOs

- fix header
- add crud for trips days and stops
- add images for stops and trips(use modals to show them and maybe to add them too)
- check which fields have to be mandatory in days and stops tables
- add graph for budget
- add some functionality related to the budget or remove it completeley
- add map for trip destination
- add map for stops
- handle day management for when the trip is in the past
- add back button
- add all frontend validations
- add toast confirm messages
- handle day creation by closing the modal and showing some toast sucess message
- add loader when clicking on handle day
- do some backend validation to aavoid days being created with the same day_number for the same trip
- add something else in the day table/creation form
- on Laravel add all api routes in the auth:sanctum middlewere and try to remove the Auth::user() from the methods and see how it reacts.
- handle visited status on stops and rating on days/trips
