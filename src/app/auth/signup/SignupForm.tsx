"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import InputFormControl from "@/components/FormControl/InputFormField";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { SignupSchema, SignupType } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpAction } from "./action";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@/hooks/use-toast";
const SignupForm = () => {
  const { toast } = useToast();
  const { executeAsync, isExecuting, result } = useAction(SignUpAction);
  const form = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });
  const onSubmit = async (values: SignupType) => {
    await executeAsync(values);
    if (result.serverError || result.validationErrors || result.data?.error) {
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
          <InputFormControl label="Username" name="username" />
          <InputFormControl label="Password" name="password" type="password" />
          <div className="flex justify-end">
            <Link
              href={"/auth/login"}
              className="w-full text-sm hover:text-blue-500 hover:underline underline-offset-2 text-right"
            >
              {"Login to account"}
            </Link>
          </div>
          <Button className="bg-blue-500  hover:bg-blue-600 dark:bg-blue-600 w-full text-white text-xl">
            {isExecuting ? "Signing up..." : "Signup"}
          </Button>
        </FormProvider>
      </form>
    </Form>
  );
};

export default SignupForm;
