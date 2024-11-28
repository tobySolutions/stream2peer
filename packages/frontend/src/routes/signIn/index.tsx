import { FormEvent, useEffect, useState } from "react";
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
  getUserDetails,
  handleGitHubSignIn,
  handleGoogleSignIn,
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

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const userCode = params.get("code") ?? "";
  storeDataInCookie("userCode", userCode, 1);

  useEffect(() => {
    const userCodeFromCookie = getDataInCookie("userCode");
    const isGoogleInUrl = window.location.href.includes("google")
      ? "google"
      : "github";

    console.log(userCodeFromCookie);
    if (userCodeFromCookie !== "") {
      storeDataInCookie("loading", "true", 1);
      storeDataInCookie("oauth", isGoogleInUrl, 1);
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

            storeDataInCookie("loading", "", -1);
            storeDataInCookie("oauth", "", -1);
            storeDataInCookie("userCode", "", -1);

            navigate("/dashboard");
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || error?.message);
        }
      }
      getUserData();
    }
  }, [userCode]);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email } = formValues;
    storeDataInCookie("emailAddress", email, 1);
    sendUserAuthOtpMail(email);
    navigate(`/otp`);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === "comment") {
      const shouldBeDisabled = value.trim().length < 30;
      if (shouldBeDisabled !== isButtonDisabled) {
        setIsButtonDisabled(shouldBeDisabled);
      }
    }
  };

  const getLoadingFromCookie = () => {
    const loading = getDataInCookie("loading");
    return loading === "true";
  };

  const getOauthFromCookie = () => {
    return getDataInCookie("oauth");
  };

  const loading = getLoadingFromCookie();
  const oauthMethod = getOauthFromCookie();

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

            <Button className="w-full text-[1rem] my-[.8rem]" text="Login" />

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
                  <LoadingIcon className="w-8 h-8 animate-spin text-primary-white" />
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
                  <LoadingIcon className="w-8 h-8 animate-spin text-primary-white" />
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
