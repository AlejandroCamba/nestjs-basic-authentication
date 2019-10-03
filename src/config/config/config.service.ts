import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';

const { NODE_ENV = '' } = process.env;
const STAGE = NODE_ENV ? `.${NODE_ENV}` : '';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(filePath: string = '.env') {
    this.envConfig = dotenv.parse(readFileSync(filePath));
  }

  get<T extends string = string>(key: string): T {
    return this.envConfig[key] as T;
  }

  getAll() {
    return this.envConfig;
  }
}

export default new ConfigService(`.env${STAGE}`);
