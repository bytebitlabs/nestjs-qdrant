import { DynamicModule, Module, Provider } from '@nestjs/common';
import { QDRANT_MODULE_OPTIONS } from './qdrant.constants';
import { QdrantService } from './qdrant.service';
import {
  QdrantModuleAsyncOptions,
  QdrantModuleOptions,
  QdrantOptionsFactory
} from './interfaces/qdrant-module-options.interface';

@Module({
  providers: [QdrantService],
  exports: [QdrantService]
})
export class QdranthModule {
  static register(options: QdrantModuleOptions): DynamicModule {
    return {
      module: QdranthModule,
      providers: [{ provide: QDRANT_MODULE_OPTIONS, useValue: options }]
    };
  }

  static registerAsync(
    options: QdrantModuleAsyncOptions
  ): DynamicModule {
    return {
      module: QdranthModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)]
    };
  }

  private static createAsyncProviders(
    options: QdrantModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: QdrantModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: QDRANT_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: QDRANT_MODULE_OPTIONS,
      useFactory: async (optionsFactory: QdrantOptionsFactory) =>
        await optionsFactory.createQdrantOptions(),
      inject: [options.useExisting || options.useClass]
    };
  }
}
