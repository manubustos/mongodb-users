Proyecto de creación, lectura y edición de usuarios con MongoDB, Mongoose y Node.js

## Requisitos

- Docker

## Usando

Para poder correr la API de gestión de usuarios se debe abrir la consola en el directorio raíz y correr (con docker abierto) el comando:

> docker compose up

Docker se encargará de instalar todas las dependencias y de iniciar el programa.

## Explicación

La implementación se realizo usando 3 contenedores de docker:

- mongo: La base de datos donde se encuentra la información de los usuarios
- mongo-express: Una herramient para explorar la base de datos. Se accede desde la url http://localhost:8081 y con el usuario "user" y la contraseña "user"
- api: La API del sistema, que corre con node 16 y se accede desde la ruta http://localhost:8888
