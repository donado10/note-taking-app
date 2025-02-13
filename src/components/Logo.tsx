import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";

const Logo = () => {
  return (
    <div>
      <Image src={logo} alt="logo" />
    </div>
  );
};

export default Logo;
