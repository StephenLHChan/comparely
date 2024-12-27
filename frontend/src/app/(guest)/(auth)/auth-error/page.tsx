import { ErrorCard } from "@/components/auth/error-card";

const AuthErrorPage = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <ErrorCard />
    </div>
  );
};

export default AuthErrorPage;
