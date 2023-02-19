# Prueba de el modulo cluster

Correr el siguiente script:
    pm2 start --name="cluster" --port 8080 --mode "CLUSTER"


# Prueba de proxy y clusters con Nginx

## Cluster gestionado por pm2:
    Correr los siguientes scripts:
        pm2 start --name="server" --port 8080
        pm2 start --name="cluster" -i max --port 8081
        
## Cluster gestionardo por Nginx
    Correr los siguientes scripts:
        pm2 start --name="server" --port 8080
        pm2 start --name="cluster1" --port 8082
        pm2 start --name="cluster2" --port 8083
        pm2 start --name="cluster3" --port 8084
        pm2 start --name="cluster4" --port 8085

Para probar el correcto funcionamiento del cluster se debe ingresar a http://localhost/api/randoms/info

