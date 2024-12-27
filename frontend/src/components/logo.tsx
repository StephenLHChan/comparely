import Link from "next/link";
import React from "react";

import { Copyleft } from "lucide-react";

export const Logo = () => {
  return (
    <Link href="/" className="flex font-bold items-center">
      <span className="flex items-center justify-center size-7 lg:size-8 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary">
        <Copyleft className="size-5 lg:size-6 text-white" />
      </span>
      <h5 className="text-lg lg:text-xl">comparely</h5>
    </Link>
  );
};