# fileOperator
## Setup
### install
```
yarn install
```

### Prepare input image
Prepare image like `/input/placeholder.png`

## Run
### Start copying image for given ids range
```
node index.js --from 0 --to 239
```

### Start copying a thumb for given ids
ex. generate thumbs for id=10, 11
```
node index.js --ids 10 11
```