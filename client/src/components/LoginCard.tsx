import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "@/apis/auth-api";
import { useMutation } from "@tanstack/react-query";
import { ModeToggle } from "./ModeToggle";

export function LoginCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const loginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      navigate("/projects");
    },
    onError: (error) => console.log(error.response.data),
  });

  const handleSubmit = () => {
    loginMutation.mutate({ email, password });
  };

  return (
    <Card className="w-[calc(100%-1.5rem)] dark:bg-gray-900 lg:w-[400px] lg:p-3">
      <CardHeader className="space-y-1">
        <ModeToggle />
        <CardTitle className="text-center text-2xl">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Ready for another new task?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            placeholder="johndoe@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full" onClick={handleSubmit}>
          Login
        </Button>
        <div className="mt-3 text-sm text-muted-foreground">
          Don't have an account yet?{" "}
          <Link to="/signup" className="underline hover:text-primary">
            sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}