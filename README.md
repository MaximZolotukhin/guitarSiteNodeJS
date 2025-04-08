# guitarSiteNodeJS

Интернет магазин музыкальных инструментов

const url = 'mongodb://myuser:mypassword@localhost:27017/mydatabase';
const uri = 'mongodb://guitar:guitar777@localhost:27417/guitarShopDB?authSource=admin';

docker run -d --name guitarShopDB -p 27417:27017
-e MONGO_INITDB_ROOT_USERNAME=guitar
-e MONGO_INITDB_ROOT_PASSWORD=guitar777
-v $HOME/DOCKER/dockerMongoDB/datafiles602:/data/db mongo:latest

'mongodb://admin:admin777@localhost:27418/coursesShop?authSource=admin&authMechanism=SCRAM-SHA-256'

TODO - будет переделан всесь интрефейс, после реализации Бэкенда
