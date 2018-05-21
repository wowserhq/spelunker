# Spelunker

[![Version](https://img.shields.io/npm/v/@wowserhq/spelunker.svg)](https://www.npmjs.org/package/@wowserhq/spelunker)

Database explorer for World of Warcraft servers.

Licensed under the [**MIT** license](LICENSE.md).

![Spelunker](https://user-images.githubusercontent.com/378235/40316324-435d347a-5d1e-11e8-8d40-0e1dd2635213.png)

## Features

Spelunker exposes data from `auth`, `characters` and `world` databases as well as
World of Warcraft's own game files through an [API]. Its [web client] can be used
to conveniently browse the dataset, similar to [Wowhead].

Both parts are developed in unison in this repository using [Lerna], a tool for
managing JavaScript projects with multiple packages.

**Disclaimer:** To deliver game resources – such as icons – to the web client,
Spelunker ships with a pipeline serving up resources to the browser over HTTP.
Depending on your network configuration these may be available to others. Respect
laws and do not distribute game data you do not own.

### Supported servers and game versions

- [Trinity Core] - 3.3.5a

Other servers may be supported in the future. Pull requests welcome!

## Usage

Not yet available via [npm], but hopefully [soon™]!

For now, follow the development instructions below on how to get started.

## Development

Spelunker is developed with [Webpack] and [Babel], targeting modern JavaScript
runtimes.

1. Clone the repository:

   ```shell
   git clone git://github.com/wowserhq/spelunker.git
   ```

2. Download and install [Node] **8.x** – including `npm` – for your platform.

   Versions **7.x and lower** lack required features.

   Versions **9.x and higher** fail installing the [Blizzardry] dependency. This
   will be addressed in the future.

3. Install dependencies:

   ```shell
   npm install
   ```

4. Install [StormLib] and [BLPConverter], which are used to handle Blizzard's
   game files.

5. Copy `.envrc-sample` to `.envrc` and adjust accordingly.

   In particular, verify `DATA_DIR` and `DATABASE_*` variables.

6. Source the `.envrc` file:

   ```shell
   source .envrc
   ```

   Alternatively, use [direnv] and allow the changes:

   ```shell
   direnv allow
   ```

### API

Navigate into the API package:

```shell
cd packages/spelunker-api
```

Run the API server:

```shell
npm start
```

To monitor source files and rebuild:

```shell
npm run watch
```

The API will be served on `http://localhost:3001`.

### Web client

Navigate into the web client package:

```shell
cd packages/spelunker-web
```

[webpack]'s development server monitors source files and rebuilds:

```shell
npm start
```

The web client will be served on `http://localhost:3000`.

## Contribution

When contributing, please:

- Fork the repository
- Open a pull request (preferably on a separate branch)

[API]: /wowserhq/spelunker/tree/master/packages/spelunker-api
[Babel]: http://babeljs.io/
[Blizzardry]: https://github.com/wowserhq/blizzardry
[BLPConverter]: https://github.com/wowserhq/blizzardry#blp
[Lerna]: https://github.com/lerna/lerna
[Node]: http://nodejs.org/#download
[StormLib]: https://github.com/wowserhq/blizzardry#mpq
[Trinity Core]: https://github.com/TrinityCore/TrinityCore/tree/3.3.5
[Wowhead]: http://www.wowhead.com/
[direnv]: https://github.com/direnv/direnv
[npm]: https://www.npmjs.com
[soon™]: http://www.wowwiki.com/Soon
[web client]: /wowserhq/spelunker/tree/master/packages/spelunker-web
[webpack]: https://webpack.js.org/
