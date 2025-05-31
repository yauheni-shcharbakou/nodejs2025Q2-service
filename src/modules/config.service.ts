import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly env = {
    PORT: +(process.env.PORT ?? 4000),
  } as const;

  get<Key extends keyof typeof this.env>(envName: Key): (typeof this.env)[Key] {
    return this.env[envName];
  }
}
