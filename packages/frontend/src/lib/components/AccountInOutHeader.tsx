import React from "react";
// import digitDataLogo from "../assets/logo.webp";
import { LogoIcon } from "../../assets/svg-exports";

export default function AccountInOutHeader({ title, description }) {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center">
        <LogoIcon theme="dark" />
      </div>
      <div className="space-y-2">
        <h1 className="text-lg bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
