# Estructura del Projecte i Biblioteques Externes

El projecte del Campus Virtual està organitzat en una estructura modular per facilitar el manteniment i l'escalabilitat. A continuació es detalla l'estructura del projecte i les biblioteques externes utilitzades:

## Estructura del Projecte

- **models/**: Conté els models de dades que interactuen amb la base de dades.
- **controllers/**: Conté els controladors de l'aplicació que gestionen les peticions HTTP i les respostes.
- **utils/**: Conté utilitats i funcions d'ajuda per a diverses tasques.
- **tests/**: Conté els fitxers de proves unitàries per assegurar el correcte funcionament del codi.
- **app.js**: Fitxer principal que configura i engega l'aplicació Express.
- **config.js**: Fitxer de configuració que gestiona les variables d'entorn i la configuració global.
- **db.js**: Fitxer que estableix la connexió amb la base de dades SQLite.

## Biblioteques Externes

- **Express**: Utilitzat com el framework principal per crear l'API REST per la seva simplicitat i robustesa.
- **SQLite3**: Utilitzat com el sistema de gestió de bases de dades per emmagatzemar i recuperar dades de manera eficient.
- **jsonwebtoken**: Utilitzat per a la generació i verificació de tokens JWT per a l'autenticació d'usuaris.
- **bcrypt**: Utilitzat per al hash de contrasenyes d'usuari abans d'emmagatzemar-les a la base de dades, garantint la seguretat de les credencials.
- **Supertest**: Utilitzat per a realitzar proves d'integració HTTP per assegurar la funcionalitat correcta dels punts d'entrada de l'API.


