import { checkPermission } from "@/apis/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const permissionMutation = useMutation({
    mutationFn: checkPermission,
    onSuccess: (data) => console.log(data),
    onError: (error) => {
      console.log(error.response.data), navigate("/login");
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    permissionMutation.mutate({ token });
    console.log("use effect runs");
  }, [pathname]);

  return <Outlet />;
}