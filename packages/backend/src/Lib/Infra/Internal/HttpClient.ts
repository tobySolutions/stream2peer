import axios from "axios";
import { GetRequestDto } from "TypeChecking/GeneralPurpose/GetRequestDto";
import { PostRequestDto } from "TypeChecking/GeneralPurpose/PostRequestDto";
import { PutRequestDto } from "TypeChecking/GeneralPurpose/PutRequestDto";
import { DeleteRequestDto } from "TypeChecking/GeneralPurpose/DeleteRequestDto";

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

  public static async put(putRequestDto: PutRequestDto) {
    const { url, headers, body } = putRequestDto;

    const axiosInstance = axios.create({ headers });

    try {
      const response = await axiosInstance.put(url, body);
      return response.data;
    } catch (error) {
      console.error("PUT request error:", error);
    }
  }

  public static async delete(deleteRequestDto: DeleteRequestDto) {
    const { url, headers } = deleteRequestDto;
    
    const axiosInstance = axios.create({ headers });

    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      console.error("DELETE request error:", error);
    }
  }
}
