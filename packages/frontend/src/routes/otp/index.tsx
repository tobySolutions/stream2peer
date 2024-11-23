import { FormEvent, useState } from "react";
import { OtpInput } from "../../lib/OtpInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../lib/navbar";
import Button from "../../lib/Button";
import { getDataInCookie, storeDataInCookie } from "../../utils/utils";
import { verifyUserOtp } from "../../network/auth/auth";

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
    console.log(payload);

    try {
      const userDataResponse = await verifyUserOtp(
        payload.email,
        payload.token
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
    } catch (error) {
      console.error(error);
    }
  };

  console.log(otp);

  return (
    <div>
      <Navbar />
      <div className=" bg-black justify-center items-center flex min-h-screen">
        <article>
          <form onSubmit={submitForm}>
            <OtpInput otp={otp} setOtp={setOtp} />

            <div className="py-3">
              <Button
                className="w-full text-[1rem] my-[.8rem]"
                text="Verify Otp"
              />
            </div>
          </form>
        </article>
      </div>
    </div>
  );
}

export default Otp;
