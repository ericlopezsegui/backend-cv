# Punts d'Entrada de la REST API
La REST API proporciona un conjunt d'interfícies que permeten als clients interactuar amb el sistema Virtual Campus. A través d'aquests punts d'entrada, els usuaris poden gestionar diverses funcionalitats com la creació d'activitats, les inscripcions als cursos, les qualificacions dels estudiants i les sol·licituds de participació en els cursos.

Cada punt d'entrada està dissenyat per oferir una funcionalitat específica i admet diversos mètodes HTTP, inclosos POST, GET, PUT i DELETE, per gestionar les operacions CRUD (crear, llegir, actualitzar i eliminar) en les dades del sistema.

A continuació, es detallen els punts d'entrada principals de la REST API juntament amb els mètodes HTTP admesos i una breu descripció de la seva funcionalitat.
## /api/cv/activities

- **Descripció**: Aquest punt d'entrada permet gestionar les activitats relacionades amb els cursos.
  
- **Mètodes HTTP Admesos**:
  - POST: Crea una nova activitat.
  - GET: Obté totes les activitats o una activitat específica per identificador.
  - PUT: Actualitza les dades d'una activitat existent.
  - DELETE: Elimina una activitat per identificador.

## /api/cv/enrollments

- **Descripció**: Aquest punt d'entrada permet gestionar les inscripcions dels usuaris als cursos.
  
- **Mètodes HTTP Admesos**:
  - POST: Crea una nova inscripció.
  - GET: Obté totes les inscripcions o una inscripció específica per identificador.
  - PUT: Actualitza les dades d'una inscripció existent.
  - DELETE: Elimina una inscripció per identificador.

## /api/cv/grades

- **Descripció**: Aquest punt d'entrada permet gestionar les qualificacions dels usuaris en les activitats dels cursos.
  
- **Mètodes HTTP Admesos**:
  - POST: Crea una nova qualificació.
  - GET: Obté totes les qualificacions o una qualificació específica per identificador.
  - PUT: Actualitza les dades d'una qualificació existent.
  - DELETE: Elimina una qualificació per identificador.

## /api/cv/requests

- **Descripció**: Aquest punt d'entrada permet gestionar les sol·licituds dels usuaris als cursos.
  
- **Mètodes HTTP Admesos**:
  - POST: Crea una nova sol·licitud.
  - GET: Obté totes les sol·licituds o una sol·licitud específica per identificador.
  - PUT: Actualitza les dades d'una sol·licitud existent.
  - DELETE: Elimina una sol·licitud per identificador.

## /api/cv/subjects

- **Descripció**: Aquest punt d'entrada permet gestionar els cursos.
  
- **Mètodes HTTP Admesos**:
  - POST: Crea un nou curs.
  - GET: Obté tots els cursos o un curs específic per identificador.
  - PUT: Actualitza les dades d'un curs existent.
  - DELETE: Elimina un curs per identificador.

## /api/cv/users

- **Descripció**: Aquest punt d'entrada permet gestionar els usuaris.
  
- **Mètodes HTTP Admesos**:
  - POST: Crea un nou usuari o inicia sessió.
  - GET: Obté tots els usuaris o un usuari específic per identificador.
  - PUT: Actualitza les dades d'un usuari existent.
  - DELETE: Elimina un usuari per identificador.

Cada punt d'entrada ofereix funcionalitats específiques per interactuar amb les dades del sistema a través de la REST API.
