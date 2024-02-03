import axios from 'axios';
import * as GithubWebservice from './GithubWebservice';

import {
  createRandomUserData,
  createRandomRepositoriesData,
} from '@/utils/mocks/user/mockUserData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GithubWebservice: Enhanced Testing for getUsersService and getRepositoriesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should succeed on github user request with correct parameters', async () => {
    const successResponseData = createRandomUserData();
    mockedAxios.get.mockResolvedValue({ data: successResponseData });

    const response = await GithubWebservice.getUsersService({
      name: 'andresws12',
    });

    expect(response).toEqual(successResponseData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${GithubWebservice.baseUrl}/andresws12`
    );
  });

  it('Should handle network error on github user request', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await expect(
      GithubWebservice.getUsersService({ name: 'andresws12' })
    ).rejects.toThrow('Failed to fetch user data');
  });

  it('Should succeed on github user repositories request with correct parameters', async () => {
    const successResponseData = createRandomRepositoriesData();
    mockedAxios.get.mockResolvedValue({ data: successResponseData });

    const response = await GithubWebservice.getRepositoriesService({
      name: 'andresws12',
    });

    expect(response).toEqual(successResponseData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${GithubWebservice.baseUrl}/andresws12/repos`
    );
  });

  it('Should handle 404 not found on github repositories request', async () => {
    mockedAxios.get.mockRejectedValue({ response: { status: 404 } });

    await expect(
      GithubWebservice.getRepositoriesService({ name: 'unknownUser' })
    ).rejects.toThrow('Failed to fetch repositories data');
  });
});
