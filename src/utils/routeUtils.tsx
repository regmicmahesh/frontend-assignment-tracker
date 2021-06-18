type Route = {
  path: string;
  name: string;
};

export const routes: Route[] = [
  { path: "/dashboard", name: "Dashboard" },
  { path: "/dashboard/assignment", name: "Dashboard / Assignment" },
  { path: "/dashboard/assignment/add", name: "Dashboard / Assignment / Add" },
  { path: "/dashboard/student", name: "Dashboard / Students" },
  { path: "/dashboard/profile", name: "Dashboard / Profile" },
];
