import { REST_API_SERVER_URL, COMMAND_ID } from '../../constants';

interface ISingUpResponse {
  errors?: Array<{ extensions: { code: string } }>;
  token?: string;
}

export const singup = async (email: string, password: string): Promise<ISingUpResponse> => {
  try {
    const response = await fetch(REST_API_SERVER_URL + `/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, commandId: COMMAND_ID }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка запроса:', error);
    throw error;
  }
};
