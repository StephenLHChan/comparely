import Link from "next/link";
import { getUsers } from "@/data/user";

import { Button } from "@/components/ui/button";
import { UserDataTable } from "@/app/(protected)/admin/user/data-table";

import { CirclePlus } from "lucide-react";

const UserPage = async () => {
  const users = await getUsers();

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <Button asChild>
          <Link href="#">
            <CirclePlus className="me-2" /> Add New User
          </Link>
        </Button>
      </div>
      {users ? (
        <UserDataTable data={users} />
      ) : (
        <h1>Oops! Something went wrong...</h1>
      )}
    </>
  );
};

export default UserPage;
