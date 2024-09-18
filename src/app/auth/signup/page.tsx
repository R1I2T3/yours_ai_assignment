import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import SignupForm from "./SignupForm";
const SIgnupPage = () => {
  return (
    <Card className="w-[90%] md:w-[60%] lg:w-[40%]">
      <CardHeader className="m-auto text-3xl font-semibold text-center">
        Signup Form
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
    </Card>
  );
};

export default SIgnupPage;
