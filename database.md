# Descripció de la Base de Dades
La base de dades que hem creat consta de diverses taules que representen diferents elements dins d'un sistema de gestió de cursos o d'educació. A continuació, es descriu el disseny intern i l'estructura de les taules:

## Taula "Activities"

- Camps:
  - `ActivityID` (INTEGER, clau primària, autoincremental): Identificador únic de l'activitat.
  - `SubjectID` (INTEGER, no nul): Identificador del curs al qual pertany l'activitat.
  - `Title` (TEXT, no nul): Títol de l'activitat.
  - `Description` (TEXT, no nul): Descripció de l'activitat.
  - `File` (BLOB, no nul): Fitxer relacionat amb l'activitat.
  - `Deadline` (TEXT, no nul): Data límit per a l'activitat.

## Taula "Enrollment"

- Camps:
  - `EnrollmentID` (INTEGER, clau primària, autoincremental): Identificador únic de la inscripció.
  - `UserID` (INTEGER, no nul): Identificador de l'usuari inscrit.
  - `SubjectID` (INTEGER, no nul): Identificador del curs inscrit.
  - `Role` (TEXT, no nul): Rol de l'usuari en el curs (estudiant, professor, etc.).

## Taula "Grades"

- Camps:
  - `GradeID` (INTEGER, clau primària, autoincremental): Identificador únic de la qualificació.
  - `SubjectID` (INTEGER, no nul): Identificador del curs relacionat amb la qualificació.
  - `Score` (REAL, no nul): Nota o puntuació de l'usuari.
  - `UserID` (INTEGER, no nul): Identificador de l'usuari a qui pertany la qualificació.
  - `ActivityID` (INTEGER, no nul): Identificador de l'activitat relacionada amb la qualificació.

## Taula "Request"

- Camps:
  - `RequestID` (INTEGER, clau primària, autoincremental): Identificador únic de la sol·licitud.
  - `UserID` (INTEGER, no nul): Identificador de l'usuari que fa la sol·licitud.
  - `SubjectID` (INTEGER, no nul): Identificador del curs relacionat amb la sol·licitud.
  - `request_time` (TEXT, no nul): Data i hora de la sol·licitud.
  - `status` (TEXT, no nul): Estat de la sol·licitud (pendent, aprovat, denegat).

## Taula "Subject"

- Camps:
  - `SubjectID` (INTEGER, clau primària, autoincremental): Identificador únic del curs.
  - `Name` (TEXT, no nul): Nom del curs.
  - `Year` (TEXT, no nul): Any del curs.
  - `Description` (TEXT, no nul): Descripció del curs.
  - `Status` (INTEGER, no nul): Estat del curs.

## Taula "Users"

- Camps:
  - `UserID` (INTEGER, clau primària, autoincremental): Identificador únic de l'usuari.
  - `Name` (TEXT, no nul): Nom de l'usuari.
  - `Username` (TEXT, no nul): Nom d'usuari.
  - `Password` (BLOB, no nul): Contrasenya de l'usuari.
  - `Email` (TEXT, no nul): Adreça de correu electrònic de l'usuari.
  - `Role` (TEXT, no nul): Rol de l'usuari (estudiant, professor, etc.).
