# Project documentation
Aquí es veurà una explicació de cada punt implementat de millora a la pràctica 3. En el nostre cas, hem buscar fer més de 10 punts a aquesta pràctica per aprendre el màxim possible i, alhora assegurar una millora notòria a la nostra APP. Hem decidit desenvolupar millores al backend.

## Functionality
### (3 points) Implement the file uploading functionality in Activities.
En el nostre cas, aquest punt ja el vam implementar a la primera entrega de la pràctica de backend, creant funcions per crear i actualitzar les activitats. Tot i això, hem implementat una llibreria de middleware anomenada "Multer", que gestiona la pujada de documents i arxius a una aplicació web. Aquesta llibreria permet manipular els noms dels arxius pujats, afegir restriccions, limitar el pes, etc.

### (2 point) Allow different formats for the uploaded files, not just .txt.
Per tal de permetre diferents formats, hem afegit un nou atribut a la taula ActivityFiles anomenada FileName, amb la qual desar el nom de l'arxiu i la seva extensió; d'aquesta manera, es permetran diferents formats per als arxius carregats.

PD: Cal tenir en compte, que aquesta implementació l'hem fet després de fer l'apartat que ve just després d'aquest, que és el de permetre pujar més d'un arxiu, per això parlem d'una taula nova anomenada ActivityFiles.

### (4 points) Allow uploading more than one file.
Per implementar aquest punt, vam haver de modificar la base de dades, creant una nova taula anomenada *ActivityFiles* (en el nostre cas), que serveix per carregar l'arxiu o arxius per ID, relacionant-los amb l'activitat que corresponen i on es volen entregar.

A més, vam haver de fer una sèrie de modificacions per tal de poder insertar i actualitzar la base de dades, creant registres a la nova taula creada, cada cop que es crea una nova activitat. D'aquesta manera, la gestió dels arxius no depen d'una sola taula, i es permetrà la càrrega de més d'un arxiu a una sola activitat, que fa que el campus virtual que estem desenvolupant sigui mes robust i capaç a l'hora de gestionar activitats.

## Security
### (2 points) Activate HTTPS in the backend.
Per dur a terme aquest punt, el que hem fet ha sigut modificar l'arxiu index.js; vam crear un certificat autofirmat i una clau amb OpenSSL que ens permet activar l'HTTPS. Un cop fet, hem creat una funció per comprovar que els arxius existeixen (que cridem des de la funció initServer()), des de la qual carreguem el certificat i utilitzant el mòdul https, passem els credencials i creem el servidor.
Un cop obert, el servidor dona un missatge de connexió no segura, però es un missatge comú al fer servir certificats autofirmats, i al ser un entorn de desenvolupament, tampoc suposa un problema de seguretat greu.

## Deployment
### (4 points) Change our SQLite database for another relational database that is more production-ready, such as PostgreSQL or MySQL.
En aquest apartat, hem escollit migrar la base de dades a PostgreSQL, pel que hem hagut d'instal·lar els mòduls ps i ps-hstore. 
Pel que fan modificacions al codi, hem hagut de modificar l'arxiu .env, per configurar la URL a la nova base de dades, i els arxius config.js i db.js, que també s'encarreguen de configurar la connexió amb el servidor postgres, i alguns apartats de codi dins dels models, que fan servir funcions diferents a les de SQLite, igual que a l'index.js del directori /modules, que s'encarrega de crear la connexió i la base de dades. 
Addicionalment, hem hagut de crear un contenidor docker, amb el qual creem 2 aplicacions; el servidor postgres i la nostra aplicació de backend. En el nostre cas, per encriptar contrassenyes fem servir el mòdul bcrypt, que ens va donar problemes dins del contenidor degut a que bcrypt es una llibreria que es basa en bcrypt i necessita compilar-se durant la instal·lació, mentres que bcryptjs es una implementació de bcrypt que no necessita dependre de cap dependència per ser compilada.
La migració, trobem que és un pas interessant de conèixer, ja que a la pràctica no s'acostuma a fer servir SQLite en entorns de producció, i d'aquesta manera aprenem també com és la configuració d'un backend en postgres, i aprenem la utilització de docker-compose i dockerfile a un projecte.

### (5 points) Deploy your application to the Internet.
To implement *Victor*

#### Punts realitzats: 15/20 a realitzar com a objectiu.