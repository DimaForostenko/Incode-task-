sudo docker build -t appserver:0.0.1 -f ./Dockerfile-dev .
if sudo docker ps -a | grep docker_server ;  then
 sudo docker start -i docker_server
else 
 sudo docker run -dit -p 8080:5000 -v $(pwd):/app:ro --name docker_server appserver:0.0.1
fi 
