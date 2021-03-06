import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// Old
// interface IOptions {
//   host: string;
// }
// getConnectionOptions().then((options) => {
//   const newOptions = options as IOptions;
//   newOptions.host = 'database_ignite';

//   createConnection({
//     ...options,
//   });
// });

// Configuração customizavel para 'localhost' ou 'database_ignite' docker
// export default async (host = 'database_ignite'): Promise<Connection> => {
//   const defaultOptions = await getConnectionOptions();

//   return createConnection(
//     Object.assign(defaultOptions, {
//       host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
//       database:
//         process.env.NODE_ENV === 'test'
//           ? 'rentx_test'
//           : defaultOptions.database,
//     })
//   );
// };

// Configuração para rodar no AWS
export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentx_test'
          : defaultOptions.database,
    })
  );
};
