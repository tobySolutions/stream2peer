import { FormEvent, useState } from "react";
import Navbar from "../../lib/navbar";
import Input from "../../lib/Input";
import { emailRegex } from "../../utils/utils";
import Button from "../../lib/Button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import MetaMaskIcon from "../../lib/icons/MetamaskIcon";
import {
  generateAuthWithGithubUrl,
  generateAuthWithGoogleUrl,
} from "../../network/auth/auth";

export type FormValuesType = {
  email: string;
  password: string;
};
const defaultFormValues = {
  email: "",
  password: "",
};

function Login() {
  const [formValues, setFormValues] = useState<FormValuesType>({
    ...defaultFormValues,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // await submitForm(formValues, resetFormValues);
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

  const handleGoogleSignIn = async () => {
    console.log("Google sign-in clicked");
    try {
      const { data } = await generateAuthWithGoogleUrl();
      window.location.href = data.authUrl;
    } catch (error) {
      console.error(error);
    }
  };

  const handleGitHubSignIn = async () => {
    console.log("GitHub sign-in clicked");
    try {
      const { data } = await generateAuthWithGithubUrl();
      console.log(data);
      window.location.href = data.authUrl;
    } catch (error) {
      console.error(error);
    }
  };

  const handleMetaMaskSignIn = async () => {
    // Implement MetaMask sign-in logic here
    console.log("MetaMask sign-in clicked");
  };

  return (
    <div>
      <Navbar />
      <div className=" bg-black justify-center items-center flex min-h-screen">
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
            <div className="my-[.6rem] lg:my-[1.3rem]  text-white text-[15px]">
              <Input
                type="password"
                name="password"
                value={formValues.password}
                isRequired
                minLength={8}
                maxLength={16}
                onChange={(value) => handleInputChange("password", value)}
                label="Password"
              />
            </div>

            <Button className="w-full text-[1rem] my-[.8rem]" />

            <div className="text-center text-white my-5">
              <span>or</span>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FaGoogle className="mr-2" />
                Sign in with Google
              </button>
              <button
                type="button"
                onClick={handleGitHubSignIn}
                className="flex items-center justify-center w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <FaGithub className="mr-2" />
                Sign in with GitHub
              </button>
              <button
                type="button"
                onClick={handleMetaMaskSignIn}
                className="flex items-center justify-center w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <MetaMaskIcon className="mr-2" />
                Sign in with MetaMask
              </button>
            </div>

            <div className="my-[.8rem] text-white text-[15px] text-center">
              <span>
                Don't have an account?{" "}
                <a href="/signup/" className="text-yellow-dark-9">
                  Sign Up
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
