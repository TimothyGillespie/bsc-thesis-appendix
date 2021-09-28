VERSION=1.0.0
cd frontend
./build-docker.sh $VERSION
cd ../backend
./build-docker.sh $VERSION

docker push