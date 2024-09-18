"use client";

import React from "react";
import InputFormControl from "@/components/FormControl/InputFormField";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { LoginSchema, LoginType } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { LoginAction } from "./action";
import { useToast } from "@/hooks/use-toast";
const LoginForm = () => {
  const { toast } = useToast();
  const { executeAsync, isExecuting, result } = useAction(LoginAction);
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: LoginType) => {
    await executeAsync(values);
    if (result.serverError || result.validationErrors || result.data?.error) {
      console.log("I am here");

      toast({
        title: result.data?.error || "Something went wrong",
      });
    }
  };
  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <InputFormControl label="Email" name="email" />
          <InputFormControl label="Password" name="password" type="password" />
          <Link
            href={"/auth/signup"}
            className="text-sm hover:text-blue-500 hover:underline underline-offset-2 mt-2 flex justify-end"
          >
            {"Create a account"}
          </Link>
          <Button
            className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 w-full text-white text-xl"
            disabled={isExecuting}
          >
            {isExecuting ? "Login..." : "Login"}
          </Button>
        </FormProvider>
      </form>
    </Form>
  );
};

export default LoginForm;
