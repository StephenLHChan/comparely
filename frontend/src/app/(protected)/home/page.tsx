import { signOut } from "@/auth";

const HomePage = () => {
  return (
    <div
      onClick={async () => {
        "use server";

        await signOut();
      }}
    >
      <p>HomePage</p>
    </div>
  );
};

export default HomePage;
