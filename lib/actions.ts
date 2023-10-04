import { ProjectForm } from '@/common.types';
import {
  createProjectMutation,
  createUserMutation,
  getUserQuery,
} from '@/grathql';
import { GraphQLClient } from 'graphql-request';

const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ''
  : 'http://127.0.0.1:4000/graphql';

const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ''
  : '1234';

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = (email: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader('x-api-key', apiKey);
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    console.log('response', response);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const resp = await fetch(`${serverUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({ path: imagePath }),
    });
    return resp.json();
  } catch (error) {
    throw error;
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imgUrl = await uploadImage(form.image);

  if (imgUrl.url) {
    client.setHeader('x-api-key', apiKey);
    client.setHeader('Authorization', `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: imgUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };
    return makeGraphQLRequest(createProjectMutation, variables);
  }
};
