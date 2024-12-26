"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";

const handleOnClick = (provider: "google" | "github") => {
  signIn(provider, {
    callbackUrl: DEFAULT_LOGIN_REDIRECT,
  });
};

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleOnClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleOnClick("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
