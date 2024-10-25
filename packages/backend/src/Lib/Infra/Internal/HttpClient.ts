import { GetRequestDto } from "TypeChecking/GeneralPurpose/GetRequestDto";
import axios from "axios";
import { PostRequestDto } from "TypeChecking/GeneralPurpose/PostRequestDto";

export class HttpClient {
  public static async get(getRequestDto: GetRequestDto) {
    const { url, headers } = getRequestDto;

    const axiosInstance = axios.create({ headers });

    try {
      const response = await axiosInstance.get(url);

      return response.data;
    } catch (axiosPostRequestError) {
      console.log(axiosPostRequestError);
    }
  }

  public static async post(postRequestDto: PostRequestDto) {
    const { url, headers, body } = postRequestDto;

    const axiosInstance = axios.create({ headers });

    try {
      const response = await axiosInstance.post(url, body);

      return response.data;
    } catch (axiosPostRequestError) {
      console.log(axiosPostRequestError);
    }
  }
}
