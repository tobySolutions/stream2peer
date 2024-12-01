import { FormEvent, useState } from "react";
import { OtpInput } from "../../lib/OtpInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "../../lib/components/Navbar";
import { Button } from "../../lib/components/ui/button";
import { getDataInCookie, storeDataInCookie } from "../../utils/utils";
import { verifyUserOtp } from "../../network/auth/auth";
import { toast } from "react-toastify";

function Otp() {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = getDataInCookie("emailAddress");

    const payload = {
      email,
      token: otp,
    };

    try {
      const userDataResponse = await verifyUserOtp(
        payload.email,
        payload.token
      );
      if (userDataResponse.statusCode === 200) {
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
      console.error(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className=" bg-black justify-center items-center flex min-h-screen">
        <article>
          <form onSubmit={submitForm}>
            <OtpInput otp={otp} setOtp={setOtp} />

            <Button className="w-full text-lg my-4" size="lg">
              Verify Otp
            </Button>
          </form>
        </article>
      </div>
    </div>
  );
}

export default Otp;
