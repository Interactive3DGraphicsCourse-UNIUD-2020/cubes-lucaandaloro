# Cubes - 3Dint First Project

![A small preview](photos/showcase.gif)

### Studente:
- Luca Andaloro - 151316

## Descrizione:

L'intero progetto si basa, come da consegna, nel costruire una scena esclusivamente composta da cubi. L'idea da subito è stata quella di creare un ambiente naturale composto da montagne, fiume, vegetazione e una cascata.
Sono partito costruendo il terreno con una heightmap (spiegherò nel dettagli nela sezione "terreno"), poi ho aggiunta diversi elementi tra cui: 
- Nuvole: Per le nuvole inizialmente avevo trovato un'esempio online che volevo riprodurre ma poi è stato scardato perchè mi sembrava troppo complesso e forse introduceva già alcuni argomenti che non abbiamo ancora trattato nella pirma parte del corso. Quindi ho deciso di creare una versione più semplificata, ho creato nuvole di diverse dimensioni e diverse altezze
- Cascata:
- Mulino:
- Ponte: 
- Alberi:

## Terreno:

// Foto Heigtmops 
// dire che l'ho modificata con photoshop
//dire dei diversi colori
//dire le opzioni bassa, alta o con tanti cubi


## Ottimizzazione:

Si è dedicato molto tempo per ottimizzare il progetto sotto la parte prestazionale. Come spiegato nel diario dopo diverse prove si è deciso di costruire l'intero terreno impilando diversi cubetti (1X1X1) così da gestire meglio gli strati del terreno. Peò usando questa tecnica il numero di cubi è aumentato esponenzialmente, quindi per ottimizzare al meglio il progetto si è deciso di inserire i singoli cubi all'interno di un array (suddivisi per tipologia del terreno) effettuando un merge finale, così facendo si effetua una sola mesh e un solo add per ogni tipo di terreno. Da quel momento in poi l'intero progetto è diventato più veloce da aprire e da visionare mantendo quasi sempre un fps a 60 a parte quando viene effettua uno zoom elevato. La stessa tecnica è stata utilizzato per la creazione della cascata. 
E' stato preso in cosniderazione anche la possbilità di eliminare le facce dei cubi non visibili ma visto che il progetto era già abbastanza fluido si è deciso di dedicare il tempo per altri dettagli.

## Struttura:

* `./index.html` -> File principale dove vengono richiamate tutte le funzioni per la creazione degli elementi
* `./README.md` -> E' file che si sta consultando e contine una breve descrizione del progetto
* `./journal.md` -> Diario giornaliero dei lavori e test svolti
* **`./js`** -> Contiene tutti i file js del progetto
  * `./js/terreno.js` -> Crea la base di tutto il progetto, creando appunto il terreno partendo da un heightmap (scala di grigi) e aggiunge gli alberi in modo automatico
  * `./js/mulino.js` -> Crea l'intero mulino partendo dalla strttura della casa e aggiundendo la parte del mulino 
  * `./js/cascata.js` -> Aggiunge una cascata "inregolare" in una posizione specifica della scena
  * `./js/ponte.js` -> Aggiunge un ponte ad "arco" (composto sempre da rettangoli) in una posizione specifica della scena
  * `./js/albero.js` -> Contine la struttura dell'albero che poi viene richimato da `./js/terreno.js` 
  * `./js/materiali.js` -> Contiene tutti i materiali di tutto il pregetto e vengono restituiti tramite la funzione `getMateriale()`
  * `./js/nuvole.js` -> Genera le nuvole
    - * `./js/test` -> Questa cartella contiene aluni file di test o di alcune soluzioni alternative per alcuni elementi
* **`./textures`** -> Contiene tutte le texture utilizzate nel progetto
* **`./heightmaps`** -> Contiene la heightmap utilizzata per generare il terreno



## Performance and browser compatibility
The scene displays correctly on Firefox (80), Safari (13.0.5), and Chrome (85), with the last one being the worst performing.
The framerate goes from 19 to 35 fps (depending on the zoom level) on a laptop with integrated graphics (Intel HD Graphics 630).
Memory usage is pretty low on all tested environments (~40-50Mb).

The most performance taxing element of the scene seems to be shadows.
To make the scene perform adequately on integrated graphics some tweaking was done to optimize shadow cameras position, resolution and frustum size; however, to avoid severe shadow acne and peter-panning effects, I had to set the shadowmap's size to 4k on the directional light simulating the sun/moon and to 2k on the flame's point light.

Other possible optimizations include rewriting the vegetation classes to use instanced meshes. Loading the terrain without vegetation, however, does not seem to offer a noticeable enough performance boost.

## Strumenti Utilizzati
- **Software**
  - VS Code
  - Safari
  - Photoshop
  - GitHub Desktop

- **Hardware:**
  - Portatile: MacBook Pro (15-inch, 2018)
  - CPU: 2,6 GHz Intel Core i7 6 core
  - Scheda grafica: Radeon Pro 560X 4 GB / Intel UHD Graphics 630 1536 MB
  - RAM: 6 GB 2400 MHz DDR4

