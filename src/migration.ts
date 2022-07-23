import * as ormconfig from './ormconfig';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(ormconfig as any);
