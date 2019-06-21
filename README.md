## Generate React-SSR Project

[![npm version](https://badge.fury.io/js/react-express-generator.svg)](npmjs.com/package/react-express-generator)

## Run Generate Project

```typescript
❯ npm i react-express-generator -g
❯ react-ssr-generate
```

## What's inside?

- [create-react-app](https://github.com/facebook/create-react-app) as base and `react-scripts` without ejecting;
- [express](https://github.com/expressjs/express) as a server;
- [stream rendering](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) because it's fast;
- [react-app-rewired](https://github.com/timarney/react-app-rewired) for improving base `react-scripts`;
- [TypeScript](https://www.typescriptlang.org/) as a main language for client and server;
- [Redux](https://github.com/reduxjs/redux) a predictable state container for JavaScript apps.
- [material-ui](https://github.com/mui-org/material-ui) Components
- [webpack](https://webpack.js.org) build
- [hmr](https://webpack.js.org/guides/hot-module-replacement/) (Hot Module Resolver) in webpack

## Usage

``` bash
❯ npm i
❯ npm start
```

Point your browser to [http://localhost:3000/](http://localhost:3000/). 

## Building

``` bash
❯ npm run build
```

## Production

``` bash
❯ npm run start:production
```

Point your browser to [http://localhost:3000/](http://localhost:3000/).

## Structure
```typescript
app
└───.config
│   │   webpack.client.js
│   │   webpack.server.js
│   
└───src
│   │ index.tsx
│   │ registerServiceWorker.ts
│   │
│   └───pages
│   │   │
│   │   └───.App
│   │   │
│   │   └───FrontPage
│   │   │ 
│   │   └───NotFoundPage
│   │
│   └───reducers
│       │   index.ts
│       │   typings.ts
│  
└───public
│       │   favicon.ico
│       │   manifest.json
│    
└───server
│   │   index.ts
│   │   createApp.ts
│   └───routes
│       │   index.ts
│       │   render.tsx
│ 
│   README.md
│   package.json
│   tsconfig.json
│   LICENSE
│*  tslint.json
│*  postcss.config.js
│*  jest.config.js
```

### License [MIT](LICENSE)

#### support: v899111121@gmail.com
