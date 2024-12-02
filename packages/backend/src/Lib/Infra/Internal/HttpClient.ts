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
      const response = await axiosInstance.get(url, {params});
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (axiosGetRequestError: any) {
      console.log(`axiosGetRequestError -> ${axiosGetRequestError.message}`);
      throw axiosGetRequestError;
    }
  }

  public static async post(postRequestDto: PostRequestDto) {
    const { url, headers, params, body } = postRequestDto;

    const axiosInstance = axios.create({ headers });

    try {
      const response = await axiosInstance.post(url, body, {params});
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (axiosPostRequestError: any) {
      console.log(`axiosPostRequestError -> ${axiosPostRequestError.message}`);
      throw axiosPostRequestError;
    }
  }

  public static async patch(putRequestDto: PutRequestDto) {
    const { url, headers, body } = putRequestDto;

    const axiosInstance = axios.create({ headers });

    try {
      const response = await axiosInstance.patch(url, body);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (axiosPatchRequestError: any) {
      console.log(`axiosPostRequestError -> ${axiosPatchRequestError.message}`);
      throw axiosPatchRequestError;
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
      console.log(`axiosPutRequestError -> ${axiosPutRequestError.message}`);
      throw axiosPutRequestError;
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
      console.log(`axiosDeleteRequestError -> ${axiosDeleteRequestError.message}`);
      throw axiosDeleteRequestError;
    }
  }
}
