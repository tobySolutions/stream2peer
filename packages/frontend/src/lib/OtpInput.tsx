import OTPInput from "react-otp-input";

type OtpInputProps = {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<any>>;
};

export function OtpInput({ otp, setOtp }: OtpInputProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        inputType="number"
        inputStyle="otp-input"
        renderSeparator={<span> </span>}
        renderInput={(props) => <input {...props} />}
      />
    </div>
  );
}
