VERSION=$1
IMAGE_NAME=private.docker.gillespie.eu/repository/gillespie-private-docker/bsc-thesis-frontend:$VERSION
ng build --prod
docker build -t "$IMAGE_NAME" .
