import { FormEvent, useCallback, useEffect, useState } from "react";
import Navbar from "../../lib/navbar";
import Input from "../../lib/Input";
import {
  emailRegex,
  getDataInCookie,
  storeDataInCookie,
} from "../../utils/utils";
import Button from "../../lib/Button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import {
  generateAuthWithGithubUrl,
  generateAuthWithGoogleUrl,
  getUserDetails,
  sendUserAuthOtpMail,
} from "../../network/auth/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingIcon } from "@livepeer/react/assets";

export type FormValuesType = {
  email: string;
};

const defaultFormValues = {
  email: "",
};

function SignIn() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<FormValuesType>({
    ...defaultFormValues,
  });

  const [loading, setLoading] = useState(false);
  const [callbackloading, setCallbackLoading] = useState(false);
  const [oauthMethod, setOauthMethod] = useState<string | null>(null);

  const userCode = params.get("code") ?? "";
  storeDataInCookie("userCode", userCode, 1);

  useEffect(() => {
    const userCodeFromCookie = getDataInCookie("userCode");
    const isGoogleInUrl = window.location.href.includes("google")
      ? "google"
      : "github";

    if (userCodeFromCookie) {
      setLoading(true);
      async function getUserData() {
        try {
          const userDataResponse = await getUserDetails(
            userCodeFromCookie,
            isGoogleInUrl
          );

          if (userDataResponse?.statusCode === 200) {
            const token = userDataResponse.data.token.split(" ")[1];
            storeDataInCookie(
              "userDataResponse",
              JSON.stringify(userDataResponse.data),
              1
            );
            storeDataInCookie("userToken", token, 2);
            navigate("/dashboard");
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || error?.message);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
      getUserData();
    }
  }, [userCode]);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email } = formValues;
    storeDataInCookie("emailAddress", email, 1);
    try {
      await sendUserAuthOtpMail(email);
      navigate(`/otp`);
    } catch (error: any) {
      toast.error("Error sending OTP email.");
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleGoogleSignIn = useCallback(async () => {
    setLoading(true);
    setOauthMethod("google");
    try {
      const { data } = await generateAuthWithGoogleUrl();
      window.location.href = data?.authUrl;
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  }, [oauthMethod]);

  const handleGitHubSignIn = useCallback(async () => {
    setLoading(true);
    setOauthMethod("github");
    try {
      const { data } = await generateAuthWithGithubUrl();
      window.location.href = data.authUrl;
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  }, [oauthMethod]);

  return (
    <div>
      <Navbar />

      <div className="justify-center items-center flex min-h-screen">
        <form
          onSubmit={handleFormSubmit}
          className="mt-[70px] mx-auto  w-[90%] max-w-[768px] lg:w-[70%] xl:w-[65%]"
        >
          <div className="rounded-[8px] border border-[#313538] px-[2.5rem] py-[3rem] md:px-[4rem]">
            <div className="my-[.6rem] lg:mt-[1.3rem]  text-white text-[15px]">
              <Input
                type="email"
                name="email"
                value={formValues.email}
                isRequired
                pattern={`${emailRegex}`}
                onChange={(value) => handleInputChange("email", value)}
                label="Email address"
              />
            </div>

            <Button
              className="w-full text-[1rem] my-[.8rem]"
              text="Login"
              isDisabled={loading} // Disable button during loading
            />

            <div className="text-center text-white my-5">
              <span>or</span>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {oauthMethod === "google" && loading ? (
                  <div className="grid place-content-center mx-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-[#FFFFFF]"></div>
                  </div>
                ) : (
                  <FaGoogle className="mr-2" />
                )}
                Sign in with Google
              </button>
              <button
                type="button"
                onClick={handleGitHubSignIn}
                disabled={loading}
                className="flex items-center justify-center w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
              >
                {oauthMethod === "github" && loading ? (
                  <div className="grid place-content-center mx-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-[#FFFFFF]"></div>
                  </div>
                ) : (
                  <FaGithub className="mr-2" />
                )}
                Sign in with GitHub
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
