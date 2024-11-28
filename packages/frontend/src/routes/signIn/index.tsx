import { useCallback, useEffect, useState } from "react";
import { getDataInCookie, storeDataInCookie } from "../../utils/utils";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import {
  generateAuthWithGithubUrl,
  generateAuthWithGoogleUrl,
  getUserDetails,
  sendUserAuthOtpMail,
} from "../../network/auth/auth";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "@tanstack/react-form";
import AccountInOutHeader from "../../lib/components/AccountInOutHeader";
import FormInput from "../../lib/components/FormInput";
import { cn } from "../../utils/cn";
import SubmitButton from "../../lib/components/SubmitButton";
import viewSP from "../../assets/view-sp.png";

export type FormValuesType = {
  email: string;
};

function SignIn() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [oauthMethod, setOauthMethod] = useState<string | null>(null);
  const userCode = params.get("code") ?? "";
  storeDataInCookie("userCode", userCode, 1);

  // Initiate the form
  const form = useForm({
    onSubmit: async ({ value }) => {
      storeDataInCookie("emailAddress", value.email, 1);
      try {
        await sendUserAuthOtpMail(value.email);
        navigate(`/otp`);
      } catch (error: any) {
        toast.error("Error sending OTP email.");
      }
    },
    defaultValues: { email: "" },
  });

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

  const handleGoogleSignIn = useCallback(async () => {
    setLoading(true);
    setOauthMethod("google");
    try {
      const { data } = await generateAuthWithGoogleUrl();
      window.location.href = data?.authUrl;
      console.log(data);
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

  const email = form.useStore((state) => state.values.email);
  return (
    <section className="h-full md:grid grid-cols-2">
      {/*****************************
       *      SIGN UP FORM           *
       *****************************/}
      <div className="sm:w-80 md:w-96 m-auto p-6">
        <AccountInOutHeader
          title="Sign In"
          description="Sign In to Stream2Peer to continue to Stream2Peer."
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="py-4"
        >
          <div>
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Email is required"
                    : value.length < 3
                      ? "Email must be at least 3 characters"
                      : undefined,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                },
              }}
              children={(field) => {
                return (
                  <>
                    <FormInput
                      fieldInfo={{
                        name: "email",
                        placeholder: "Email Address",
                      }}
                      field={field}
                      label="Enter Address"
                    />
                  </>
                );
              }}
            />
          </div>
          <SubmitButton formSubscribe={form} value="Continue" />
        </form>

        <p className="text-sm text-muted-foreground">
          Quickly create an account?{" "}
          <Link
            className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text font-bold "
            to="/signup"
          >
            Sign Up
          </Link>
        </p>

        <div className="my-8">
          <span
            className={cn(
              "block bg-muted-foreground w-full h-[0.5px] relative",
              "text-center"
            )}
          >
            <span className="text-sm absolute -top-2.5 bg-black translate-[50px] text-muted-foreground">
              OR
            </span>
          </span>
        </div>

        <AuthButton
          value="Continue with Google"
          icon={FcGoogle}
          handle0Auth={handleGoogleSignIn}
        />

        <AuthButton
          value="Continue with GitHub"
          icon={FaGithub}
          handle0Auth={handleGitHubSignIn}
        />
      </div>

      {/*****************************
       *    RIGHTSIDER BANNER       *
       *****************************/}
      <div className="hidden md:block relative p-10 overflow-hidden">
        <div className="space-y-2 mb-10 p-10 text-center">
          <h1 className="text-4xl font-bold text-white">
            Open-source streaming provider on Livepeer
          </h1>
          <p className="text-gray-500">
            Stream2Peer was built with you in mind. Stream from all your
            favorite platforms.
          </p>
        </div>

        <img
          src={viewSP}
          alt="View Stream2Peer"
          className="rounded-2xl ring-8 ring-primary/20 bg-gradient-to-b from-primary/60 to-primary absolute"
        />
      </div>
    </section>
  );
}

function AuthButton({ value, icon: Icon, handle0Auth }) {
  return (
    <div>
      <button
        onClick={handle0Auth}
        className={cn(
          "text-sm text-muted-foreground",
          "border w-full my-4 p-4",
          "flex justify-center items-center rounded-md space-x-4",
          "hover:border-gray-200"
        )}
        type="button"
      >
        <Icon />
        <span>{value}</span>
      </button>
    </div>
  );
}
export default SignIn;
