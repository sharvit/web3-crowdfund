# @nftools/phase-1-minting-react-app

React application allowing users to participate in the phase-1 minting of the myToken token.

To start a development server run:
```sh
yarn start
```

## Dependencies

This package depends on:
1. `packages/hardhat` - need to be built

## Build

Build the container:
```sh
docker build . --tag=ghcr.io/bludsncryptz/phase-1-minting-react-app:master --build-arg MONOREPO_VERSION=master
```

Start the container:
```sh
docker run -i -p 3000:3000 ghcr.io/bludsncryptz/phase-1-minting-react-app:master
```

## Deploy

An authentication is needed to push container images to the github container registry (ghcr.io).
See: [authenticating to the github container registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-to-the-container-registry)

Push the container image to the github container registry (ghcr.io):
```sh
docker push ghcr.io/bludsncryptz/myToken-token-metadata-service:master
```

**Container images are automatically pushed from the CI using github-actions.**
