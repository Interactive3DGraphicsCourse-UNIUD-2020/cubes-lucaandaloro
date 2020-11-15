# Diario del primo Progetto di Interactive 3D Graphics

### 04 Novembre 2020

- Studio di Git e GitHub
- Creazione di un secondo branch diverso da quello master con nome "sviluppo" così da sviluppare diverse parti del progetto al suo interno prima di effettaure il commit finale sul master.
- Ricerca in rete di immagini e video da cui trarre ispirazione. 
- L'idea è quella di creare un ambiente naturale composto da: dislivelli(montagne), vegetazione, cascata, fiume. 
- Studio del funzionamento dell'HeightMap.

### 05 Novembre 2020 

- Creazione file `index.html`
- Test sull'HeightMap

### 06 Novembre 2020 

- Test sul codice per generare i cubi in base all'altezze
- Capire se fare pochi cubi alti o tanti cubi più corti per il riempimento degli spazi vuoti
- Ricerca di HeightMap adeguate

### 09 Novembre 2020 

- Organizzazione della struttura del progetto: 
    - creazione del file `functions.js` che contine tutte le funzioni 
    - aggiunta la cartella `./heighmaps/`
- Definizione del codice per la creazione del terreno
- Correzione della HeightMap scelta con Photoshop per creare la cascata 
- Scelta l'opzione di creare tanti cubi per il "riempimento" invece di fare cubi molto alti (così da gestire meglio le texture)
- Prove per aggiungere alcuni elementi decorativi, come: ponte, alberi ecc..
- Studio su come alleggerire il progetto perchè ci sono troppi cubi ed è molto pesante da caricare/visualizzare

### 10 Novembre 2020 

- Test per alleggeria il peso del progetto
- Utilizzo della funzione `THREE.BufferGeometryUtils.mergeBufferGeometries` per effettuare un merge di più geometrie insieme, così facendo sembra che il progetto sia più leggero e più veloce da aprire
- Una volta ottimizzato il caricamento, mi sono dedicato alla decorazione, aggiungendo texture e oggetti

### 11 Novembre 2020 

- Prove di diverse texture per i materiali, erba, terra e roccia
- Aggiunta delle nuovole con movimento
- Costruzione di una casa che sarà parte del mulino

### 12 Novembre 2020 
- Costruzione della ruota del mulino
- Aggiunta animaziome del mulino
- Inizio creazione cascata

### 13 Novembre 2020 
- Studio animazione cascata
- Test per il posizionamento automatico dei pini, tenendo conto di: numero max, distanza e creazione solo sull'erba
- Test per l'aggiunta di bottoni che serviranno per dirversi scopi
- Per alleggerire la pagina effettuo la stessa operazione di merge fatta sul terreno anche sulla cascata

### 14 Novembre 2020 
- Aggiunta di pini/alberi in modo automatico durante la generazione del terreno
- Perfezionamento della strttura della cascata
- Test per l'animazione della cascata
- Aggiunta di texture per il mulino, sia la casa che la ruota con due tipi di legno
- Alcune prove per aggiungere dettagli extra, tra cui:
    - Test per aggiungere il sole (ma non convince la forma)
    - Test per aggiungere una grotta all'inizio della cascata
    - Test per aggungere schiuma alla fine della cascata
    - Test per migliorare l'effetto "profondità" del fiume

### 15 Novembre 2020 
- Miglioramente genrale del codice
- Aggiunta commenti nel codice
- Perfezionamento delle luci
- Creazione file `readme.md`
