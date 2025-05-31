import {
  DynamicModule,
  InjectionToken,
  InternalServerErrorException,
  Type,
} from '@nestjs/common';
import { USER_REPOSITORY } from './user/user.repository.constants';
import { UserRepositoryModule } from './user/user.repository.module';

export class RepositoryModule {
  private static readonly moduleById = new Map<InjectionToken, Type>([
    [USER_REPOSITORY, UserRepositoryModule],
  ]);

  static forFeature(
    ...repositoryInjectionTokens: InjectionToken[]
  ): DynamicModule {
    const repositoryModules = repositoryInjectionTokens.map((token) => {
      const repositoryModule = this.moduleById.get(token);

      if (!repositoryModule) {
        throw new InternalServerErrorException(
          `Invalid repository token: ${token.toString()}`,
        );
      }

      return repositoryModule;
    });

    return {
      module: RepositoryModule,
      imports: repositoryModules,
      exports: repositoryModules,
    };
  }
}
