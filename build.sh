sudo docker stop angularbackend
sudo docker rm angularbackend
sudo docker rmi angularbackendimage
sudo docker build -t angularbackendimage .
sudo docker run -d -p 3000:3000 --name angularbackenddemo angularbackendimage