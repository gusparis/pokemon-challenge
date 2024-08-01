import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      return Promise.reject(error.response.status);
    }
    return Promise.reject(error);
  }
);

export const getPokemons = async (page = 0, params: any) => {
  const response = await api.get('/pokemons', {
    params: {
      take: params?.take || 4,
      skip: page * 4,
      type_id: params?.type || 0,
      name: params?.name || null,
    },
  });
  return response.data;
};

export const fetchAll = async () => {
  const response = await api.get('/pokemons/all');
  return response.data;
};

export const battle = async (attackerId: number, defenderId: number) => {
  const response = await api.get(
    `/battles?attackerId=${attackerId}&defenderId=${defenderId}`
  );
  return response.data;
};

export const getTypes = async () => {
  const response = await api.get('/types');
  return response.data;
};

export const signIn = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await api.post('/auth/login', credentials);
  return response.data.access_token;
};

export const signUp = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await api.post('/auth/register', credentials);
  return response.data.access_token;
};
