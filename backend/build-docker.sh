VERSION=$1
IMAGE_NAME=private.docker.gillespie.eu/repository/gillespie-private-docker/bsc-thesis-backend:$VERSION
mvn clean package
docker build -t "$IMAGE_NAME" .
docker push "$IMAGE_NAME"