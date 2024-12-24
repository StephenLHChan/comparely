import { LoginForm } from "@/components/auth/login-form";

const LoginPage: React.FC = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
