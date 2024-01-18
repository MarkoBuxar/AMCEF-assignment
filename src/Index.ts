import Path from 'path';
import { Database } from './Database';
import { Server } from './Server';

require('dotenv').config({ path: Path.join(__dirname, '../.env') });

const server = new Server();
const database = Database.Instance;
