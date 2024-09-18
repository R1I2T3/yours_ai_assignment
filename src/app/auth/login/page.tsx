import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import LoginForm from "./LoginForm";
const LoginPage = () => {
  return (
    <Card className="w-[90%] md:w-[60%] lg:w-[40%]">
      <CardHeader className="m-auto text-3xl font-semibold text-center">
        Login Form
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
