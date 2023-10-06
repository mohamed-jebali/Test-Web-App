# Guida all'installazione e all'avvio di un progetto Angular su macOS
<p align="center">
<a href="https://angular.io/" target="_blank"><img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/angular_logo_icon_169595.png" height="150"></a>

</p>
## Installazione di Angular

1. Installa Angular CLI globalmente eseguendo il seguente comando:

- `sudo npm install -g @angular/cli`


Sarà richiesta la password per l'installazione.

## Creazione di un nuovo progetto

2. Crea un nuovo progetto Angular con il seguente comando:

- `ng new nome-del-tuo-progetto`


Assicurati che il nome del progetto non contenga spazi. Durante la creazione del progetto, verrà richiesto se desideri utilizzare uno stylesheet (CSS, SCSS, LESS, ecc.) e se abilitare il routing di Angular.

## Installazione dei pacchetti npm

3. Dopo aver creato il progetto, naviga nella directory del progetto e installa i pacchetti npm necessari eseguendo i seguenti comandi:

 - `npm install`
 - `npm install bootstrap`
 - `npm install sweetalert2`


## Avvio del server di sviluppo

4. Per avviare il server di sviluppo di Angular, esegui il seguente comando:

- `ng serve`