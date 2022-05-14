---
title: Postgres sql 中使用 uuid_generate_v4
date: 2022-04-27 10:37:11
tags: 
  - pg
  - postgres
  - uuid
  - uuid_generate_v4
  - prisma
---
### 添加 extension [uuid-ossp](https://www.postgresql.org/docs/current/extension-uuid-ossp.html)

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 解决 Prisma 中使用会报错

先执行

```shell
npx prisma migrate dev --create-only
```
然后打开生成的 migration.sql 文件，添加`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`到前面

然后执行
```shell
npx prisma migrate dev
```

### 参考
* https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/enable-native-database-functions
* https://www.postgresql.org/docs/current/extension-uuid-ossp.html