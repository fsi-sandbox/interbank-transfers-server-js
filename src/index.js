import path from 'path';
import dotenv from 'dotenv';

const configFile = path.join(__dirname, '../.env');
dotenv.config({ path: configFile });

const runServer = async () => {
  const { default: server } = await import('./server');
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`server started on /:${PORT}`);
  });
};

runServer();
