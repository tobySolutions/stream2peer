import axios from 'axios';
import { GetRequestDto } from 'TypeChecking/GeneralPurpose/GetRequestDto';
import { PostRequestDto } from 'TypeChecking/GeneralPurpose/PostRequestDto';
import { PutRequestDto } from 'TypeChecking/GeneralPurpose/PutRequestDto';
import { DeleteRequestDto } from 'TypeChecking/GeneralPurpose/DeleteRequestDto';

export class HttpClient {
  public static async get(getRequestDto: GetRequestDto) {
    const { url, headers, params } = getRequestDto;

    const axiosInstance = axios.create({ headers });

    try {
      const response = await axiosInstance.get(url, { params });
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (axiosGetRequestError: any) {
      console.log(axiosGetRequestError);
      throw new Error(
        `axiosGetRequestError -> ${axiosGetRequestError.message}`,
      );
    }
  }

  public static async post(postRequestDto: PostRequestDto) {
    const { url, headers, params, body } = postRequestDto;

    const axiosInstance = axios.create({ headers });

    try {
      const response = await axiosInstance.post(url, { params }, body);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (axiosPostRequestError: any) {
      console.log(axiosPostRequestError);
      throw new Error(
        `axiosPostRequestError -> ${axiosPostRequestError.message}`,
      );
    }
  }

  public static async put(putRequestDto: PutRequestDto) {
    const { url, headers, body } = putRequestDto;

    const axiosInstance = axios.create({ headers });

    try {
      const response = await axiosInstance.put(url, body);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (axiosPutRequestError: any) {
      console.log(axiosPutRequestError);
      throw new Error(
        `axiosPutRequestError -> ${axiosPutRequestError.message}`,
      );
    }
  }

  public static async delete(deleteRequestDto: DeleteRequestDto) {
    const { url, headers } = deleteRequestDto;

    const axiosInstance = axios.create({ headers });

    try {
      const response = await axiosInstance.delete(url);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (axiosDeleteRequestError: any) {
      console.log(axiosDeleteRequestError);
      throw new Error(
        `axiosDeleteRequestError -> ${axiosDeleteRequestError.message}`,
      );
    }
  }
}
