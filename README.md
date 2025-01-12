# FreedomOfTravel

## Run Ollama:

> [Documentation](https://hub.docker.com/r/ollama/ollama)

Run Ollama either locally

```bash
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

OR using the GPU

```bash
docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

Then run the model

```bash
docker exec -it ollama ollama run llama3.2
```

## Start the frontend

```bash
yarn install
yarn start
```