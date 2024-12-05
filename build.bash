docker build \
  --build-arg VITE_API_URL=http://localhost:8000 \
  --build-arg VITE_IS_DEV=false \
  -t game-app .

docker run -p 8000:8000 game-app