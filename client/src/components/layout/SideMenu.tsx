import { cn } from "@/utils";
import { Button } from "../ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";
import { LayoutGrid, CheckSquare, Settings, LogOut } from "lucide-react";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type CurrentUser,
  getCurrentUser,
} from "@/features/users/apis/user-api";
import Spinner from "../ui/spinner";




interface SideMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SideMenu({ className }: SideMenuProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { status, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });



  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/login");
  };



  if (status === "loading") return <Spinner />;
  if (status === "error") {
    return <p>Something went wrong</p>;
  }

  const currentUser = data.currentUser as CurrentUser;










  return (
    <div className={cn("pb-5", className)}>
      <div className="flex flex-col h-full">
        <div className="flex-grow space-y-4 py-4">
          <div className="px-3 py-2 flex-grow">
            <img src={logoLight} className="mb-5 h-full dark:hidden" />
            <img src={logoDark} className="mb-5 hidden dark:block h-full" />
            <h2 className="mb-2 px-4 py-8 font-bold tracking-tight text-5xl overflow-hidden truncate">Hi, {currentUser.firstname}</h2>
            <div className="space-y-1 flex-grow">
              <NavLink to="/projects" className="flex items-center">
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    <span>Projects</span>
                  </Button>
                )}
              </NavLink>
              {/*<NavLink to="/tasks" className="flex items-center">
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <CheckSquare className="mr-2 h-4 w-4" />
                    <span>My tasks</span>
                  </Button>
                )}
              </NavLink>*/}
              <NavLink to="/settings" className="flex items-center">
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Button>
                )}
              </NavLink>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="px-3">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
  
}
