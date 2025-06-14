import { Injectable, LOG_LEVELS, LogLevel, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { constants } from 'fs';
import { access, mkdir, appendFile, readdir, stat } from 'fs/promises';
import { IEnv } from '../../interfaces/env.interface';
import { join, resolve } from 'path';

@Injectable()
export class LoggingService {
  constructor(private readonly configService: ConfigService<IEnv>) {}

  private readonly logger = new Logger();
  private currentIndex = 0;
  private currentErrorIndex = 0;

  private readonly levelIndexByLevel: Map<LogLevel, number> = LOG_LEVELS.reduce(
    (acc: Map<LogLevel, number>, level, index) => {
      acc.set(level, index);
      return acc;
    },
    new Map(),
  );

  private readonly levelIndex = this.levelIndexByLevel.get(
    this.configService.get('LOG_LEVEL', { infer: true }) ?? 'log',
  );

  private readonly fileMaxSize =
    +(this.configService.get('LOG_MAX_SIZE_KB', { infer: true }) ?? 100) * 1024;

  private readonly logPath = resolve(
    __dirname,
    '../../..',
    this.configService.get('LOG_DIRECTORY', { infer: true }) ?? 'logs',
  );

  private isLevelAllowed(level: LogLevel): boolean {
    const levelIndex = this.levelIndexByLevel.get(level);
    return levelIndex >= this.levelIndex;
  }

  private async getLogFileName(
    prefix: string,
    level: LogLevel,
    content: string,
  ): Promise<string> {
    const isError = level === 'error' || level === 'fatal';
    const suffix = isError ? 'error.log' : 'log';
    let index = isError ? this.currentErrorIndex : this.currentIndex;
    const potentialName = `${prefix}.${index}.${suffix}`;

    let fileSize = 0;

    try {
      const logStat = await stat(potentialName);
      fileSize = logStat.size;
    } catch (e) {}

    const contentSize = Buffer.byteLength(content, 'utf-8');

    if (fileSize + contentSize > this.fileMaxSize) {
      index += 1;
      this[isError ? 'currentErrorIndex' : 'currentIndex'] = index;
    }

    return [prefix, index, suffix].join('.');
  }

  private async saveLogs(
    logLevel: LogLevel,
    message: any,
    stack?: string,
    context?: string,
  ): Promise<void> {
    const timestamp = new Date().toISOString();
    const [dayTimestamp] = timestamp.split('T');
    const dirname = resolve(this.logPath, dayTimestamp);

    try {
      await access(dirname, constants.W_OK | constants.R_OK);
    } catch (error) {
      await mkdir(dirname, { recursive: true });
    }

    const templateParts = [
      `[Nest] ${process.pid} - ${timestamp}\t${logLevel.toUpperCase()} `,
    ];

    if (context) {
      templateParts.push(`[${context}] `);
    }

    if (stack) {
      templateParts.push(`${stack}\n`);
    }

    const stringMessage =
      typeof message === 'object'
        ? JSON.stringify(message, null, 2)
        : message?.toString();

    templateParts.push(stringMessage);

    const logContent = templateParts.join('') + '\n';

    const fileName = await this.getLogFileName(
      dayTimestamp,
      logLevel,
      logContent,
    );

    const filePath = join(dirname, fileName);
    await appendFile(filePath, logContent, { encoding: 'utf-8' });
  }

  private async handleLogLevel(
    level: LogLevel,
    message: any,
    context = '',
    stack = '',
  ): Promise<void> {
    if (!this.isLevelAllowed(level)) {
      return;
    }

    this.logger[level](message, context);
    await this.saveLogs(level, message, stack, context);
  }

  async init(): Promise<void> {
    const timestamp = new Date().toISOString();
    const [dayTimestamp] = timestamp.split('T');
    const dirname = resolve(this.logPath, dayTimestamp);

    try {
      await access(dirname, constants.W_OK | constants.R_OK);
    } catch (error) {
      await mkdir(dirname, { recursive: true });
      return;
    }

    const logNames = await readdir(dirname, { encoding: 'utf-8' });

    for (const logName of logNames) {
      const [, index, suffix] = logName.split('.');
      const logIndex = +index;

      if (suffix === 'error') {
        if (logIndex > this.currentErrorIndex) {
          this.currentErrorIndex = logIndex;
        }

        continue;
      }

      if (logIndex > this.currentIndex) {
        this.currentIndex = logIndex;
      }
    }
  }

  async verbose(message: any, context?: string): Promise<void> {
    await this.handleLogLevel('verbose', message, context);
  }

  async debug(message: any, context?: string): Promise<void> {
    await this.handleLogLevel('debug', message, context);
  }

  async log(message: any, context?: string): Promise<void> {
    await this.handleLogLevel('log', message, context);
  }

  async warn(message: any, context?: string): Promise<void> {
    await this.handleLogLevel('warn', message, context);
  }

  async error(message: any, stack?: string, context?: string): Promise<void> {
    await this.handleLogLevel('error', message, context, stack);
  }

  async fatal(message: any, stack?: string, context?: string): Promise<void> {
    await this.handleLogLevel('fatal', message, context, stack);
  }
}
