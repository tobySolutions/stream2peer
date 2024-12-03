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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

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
      setLoading(false);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="justify-center items-center flex min-h-screen">
        <article>
          <form onSubmit={submitForm}>
            <OtpInput otp={otp} setOtp={setOtp} />

            <Button className="w-full text-lg my-4" size="lg">
              {loading ? (
                <div className="grid place-content-center mx-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-[#FFFFFF]"></div>
                </div>
              ) : (
                ""
              )}
              Verify OTP
            </Button>
          </form>
        </article>
      </div>
    </div>
  );
}

export default Otp;
