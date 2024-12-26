import { ExtendedUser } from "@/auth";
import { UserInfo } from "@/components/user-info";
import { getUser } from "@/data/user";

interface UserInfoPageProps {
  params: { userId: string };
}

const UserInfoPage = async ({ params }: UserInfoPageProps) => {
  const { userId } = await params;

  const user = await getUser(userId);

  if (!user) return <p>No user found</p>;

  return (
    <div className="min-w-[800px] max-w-[1200px] items-center">
      <UserInfo label="User Info" user={user as ExtendedUser} />
    </div>
  );
};
export default UserInfoPage;
