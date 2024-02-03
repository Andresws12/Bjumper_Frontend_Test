import axios, { AxiosResponse } from 'axios';

import { apiPrefix } from './consts';
import { UserData, RepositoriesData } from '@/models/user/UserData';
import { GithubRequest } from './models/github/GithubRequest';

export const baseUrl: string = apiPrefix('/users');

export const getUsersService = async (
  params: GithubRequest
): Promise<UserData> => {
  try {
    const response: AxiosResponse<UserData> = await axios.get<UserData>(
      `${baseUrl}/${params.name}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};

export const getRepositoriesService = async (
  params: GithubRequest
): Promise<RepositoriesData> => {
  try {
    const response: AxiosResponse<RepositoriesData> =
      await axios.get<RepositoriesData>(`${baseUrl}/${params.name}/repos`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch repositories data');
  }
};
