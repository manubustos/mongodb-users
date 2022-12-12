// import { readFileSync } from 'fs';
// import nodeFetch from 'node-fetch';

import express from 'express';
import { json as jsonBodyParser, urlencoded } from 'body-parser';

import { createUser, deleteUser, getUser, getUsers, updateUser } from './database';

const app = express();
app.disable('x-powered-by');
app.use(urlencoded({ extended: false }));
app.use(jsonBodyParser());

app.post('/user', async (request: express.Request, response: express.Response) => {
  try {
    const { email, password, name, lastName, profilePicture } = request.body as {
      email: string;
      password: string;
      name: string;
      lastName: string;
      profilePicture: string;
    };
    await createUser(email, password, name, lastName, profilePicture);
    return response.status(201);
  } catch (error) {
    return response.status(500).json({ message: error instanceof Error ? error.message : JSON.stringify(error) });
  }
});

app.patch('/user', async (request: express.Request, response: express.Response) => {
  try {
    const { email, ...data } = request.body as {
      email: string;
      password?: string;
      name?: string;
      lastName?: string;
      profilePicture?: string;
    };
    await updateUser(email, data);
    return response.status(200);
  } catch (error) {
    return response.status(500).json({ message: error instanceof Error ? error.message : JSON.stringify(error) });
  }
});

app.delete('/user', async (request: express.Request, response: express.Response) => {
  try {
    await deleteUser(request.query['email'] as string);
    return response.status(200);
  } catch (error) {
    return response.status(500).json({ message: error instanceof Error ? error.message : JSON.stringify(error) });
  }
});

app.get('/user', async (request: express.Request, response: express.Response) => {
  try {
    const user = await getUser(request.query['email'] as string);
    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({ message: error instanceof Error ? error.message : JSON.stringify(error) });
  }
});

app.get('/users', async (_, response: express.Response) => {
  try {
    const users = await getUsers();
    return response.status(200).json(users);
  } catch (error) {
    return response.status(500).json({ message: error instanceof Error ? error.message : JSON.stringify(error) });
  }
});

app.use((_: express.Request, response: express.Response) => response.sendStatus(404).end());

app.listen(8888, () => console.log('Authentication server runnig at port 8888'));
