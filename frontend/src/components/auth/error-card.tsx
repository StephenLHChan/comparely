import { CardWrapper } from "@/components/auth/card-wrapper";
import { FaExclamationTriangle } from "react-icons/fa";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex items-center justify-center">
        <FaExclamationTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
