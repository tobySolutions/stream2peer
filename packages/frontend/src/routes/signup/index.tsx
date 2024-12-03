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
import MetaMaskIcon from "../../lib/icons/MetamaskIcon";
import {
  getUserDetails,
  handleGitHubSignIn,
  handleGoogleSignIn,
  sendUserAuthOtpMail,
} from "../../network/auth/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

export type FormValuesType = {
  email: string;
};
const defaultFormValues = {
  email: "",
};

function SignUp() {
  const [params] = useSearchParams();
  const [formValues, setFormValues] = useState<FormValuesType>({
    ...defaultFormValues,
  });
  const userCode = params.get("code") ?? "";

  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    const userCodeFromCookie = getDataInCookie("userCode");

    const isGoogleInUrl = window.location.href.includes("google")
      ? "google"
      : "github";

    if (userCodeFromCookie !== "") {
      async function getUserData() {
        console.log("hey");
        try {
          const userDataResponse = await getUserDetails(
            userCodeFromCookie,
            isGoogleInUrl
          );

          if (userDataResponse?.statusCode === 200) {
            const token = userDataResponse.data.token.split(" ")[1];
            console.log("success");
            storeDataInCookie(
              "userDataResponse",
              JSON.stringify(userDataResponse.data),
              1
            );
            storeDataInCookie("userToken", token, 2);
            navigate("/dashboard");
          }

          console.log(
            JSON.parse(getDataInCookie("userDataResponse")),
            "I don enter jor"
          );
        } catch (error) {
          console.error(error);
        }
      }
      getUserData();
    }

    return () => {};
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

  // const handleMetaMaskSignIn = () => {
  //   // Implement MetaMask sign-in logic here
  //   console.log("MetaMask sign-in clicked");
  // };

  return (
    <div>
      <Navbar />
      <div className=" bg-black justify-center items-center flex min-h-screen">
        <form
          onSubmit={handleFormSubmit}
          className="mt-[70px] mx-auto  w-[90%] max-w-[768px] lg:w-[70%] xl:w-[65%]"
        >
          <div className="rounded-[8px] border border-[#313538] px-[2.5rem] py-[3rem] md:px-[4rem]">
            <div className="flex flex-col space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FaGoogle className="mr-2" />
                Sign up with Google
              </button>
              <button
                type="button"
                onClick={handleGitHubSignIn}
                className="flex items-center justify-center w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <FaGithub className="mr-2" />
                Sign up with GitHub
              </button>
              {/* <button
                type="button"
                onClick={handleMetaMaskSignIn}
                className="flex items-center justify-center w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <MetaMaskIcon className="mr-2" />
                Sign up with MetaMask
              </button> */}
            </div>

            <div className="text-center text-white my-5">
              <span>or</span>
            </div>

            <div className="my-[.6rem] text-white text-[15px]">
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

            <Button className="w-full text-[1rem] my-[.8rem]" text="Sign up" />

            <div className="my-[.8rem] text-white text-[15px] text-center">
              <span>
                Already have an account?{" "}
                <a href="/login/" className="text-yellow-dark-9">
                  Log In
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
