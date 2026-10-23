import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

function Slot({ index }: { index: number }) {
  const context = React.useContext(OTPInputContext);
  const slot = context?.slots?.[index];
  return (
    <div className="evo-otp-slot" data-active={slot?.isActive}>
      {slot?.char}
    </div>
  );
}

export function EvoInputOtp({
  length = 6,
  value,
  onChange,
}: {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <OTPInput
      data-evo="input-otp"
      maxLength={length}
      value={value}
      onChange={onChange}
      aria-label="One-time code"
      containerClassName="evo-otp"
      render={({ slots }) => (
        <div className="evo-otp" role="group" aria-label="One-time code">
          {slots.map((_, index) => (
            <Slot key={index} index={index} />
          ))}
        </div>
      )}
    />
  );
}

export const InputOtp = EvoInputOtp;
export const EvoInputOTP = EvoInputOtp;
