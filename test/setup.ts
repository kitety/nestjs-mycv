import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnectionManager } from 'typeorm';

// 每一个之前先删除
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (e) {}
});

// 每一个之后先断开连接 typeorm
global.afterEach(async () => {
  const con = getConnectionManager();
  const connections = con.connections;
  for (const connection of connections) {
    await connection.close();
  }
});
