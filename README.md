<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Qdrant module for [Nest](https://github.com/nestjs/nest) based on the official [@qdrant/js-client-rest
](https://www.npmjs.com/package/@qdrant/js-client-rest) package.

## Installation

```bash
$ npm i --save @bytebitlabs/nestjs-qdrant @qdrant/js-client-rest

```

## Usage

Import `QdrantModule`:

```typescript
@Module({
  imports: [Qdrant.register({
    url: 'http://127.0.0.1:6333',
  })],
  providers: [...],
})
export class VectorStoreModule {}
```

Inject `QdrantService`:

```typescript
@Injectable()
export class VectorStoreService {
  constructor(private readonly qdrantService: QdrantService) {}
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
QdrantModule.registerAsync({
  useFactory: () => ({
    url: 'http://127.0.0.1:6333'
  })
});
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
QdrantModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    url: configService.get('QDRANT_URL'),
  }),
  inject: [ConfigService],
}),
```

**2. Use class**

```typescript
QdrantModule.registerAsync({
  useClass: QdrantConfigService
});
```

Above construction will instantiate `QdrantConfigService` inside `QdrantModule` and will leverage it to create options object.

```typescript
class QdrantConfigService implements QdrantOptionsFactory {
  createQdrantOptions(): QdrantModuleOptions {
    return {
      url: 'http://127.0.0.1:6333'
    };
  }
}
```

**3. Use existing**

```typescript
QdrantModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```

It works the same as `useClass` with one critical difference - `QdrantModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.

## API Spec

The `QdrantService` wraps the `QdrantClient` from the official [@qdrant/js-client-rest
](https://www.npmjs.com/package/@qdrant/js-client-rest) methods. The `QdrantModule.register()` takes `options` object as an argument, [read more](https://qdrant.tech/documentation/quickstart/).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
