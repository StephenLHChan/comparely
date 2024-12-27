import { UserRole } from "@/auth";

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /home
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const adminRoutesPrefix = "/admin";

export const DEFAULT_LOGIN_REDIRECT = "/home";

export type PageRoute = {
  title: string;
  items: PageRoutesItemType;
  allowedRoles: UserRole[];
};

type PageRoutesItemType = {
  title: string;
  href: string;
  icon?: string;
  isComing?: boolean;
  isNew?: boolean;
  newTab?: boolean;
  items?: PageRoutesItemType;
}[];

export const pageRoutes: PageRoute[] = [
  {
    title: "Admin",
    allowedRoles: ["ADMIN"],
    items: [
      {
        title: "Users",
        href: "/admin/user",
        icon: "Users",
      },
    ],
  },
];
