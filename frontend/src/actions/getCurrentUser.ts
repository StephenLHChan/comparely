import { getUser } from "@/data/user";
import { auth } from "@/auth";

const getCurrentUser = async () => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return null;
    }

    const currentUser = await getUser(session.user.id);
    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch {
    return null;
  }
};

export default getCurrentUser;
