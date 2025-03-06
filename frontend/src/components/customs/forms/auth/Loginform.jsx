import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/api/authApi";
import { cn } from "@/lib/utils";
import { usePostData } from "@/hooks/fetchData";
import { handleApiError } from "@/utils/handleErrors";
import { PasswordInput } from "../../passwordInput.jsx/PasswordInput";

const LoginForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError } = usePostData("loginUser", login);

  const FormSchema = z.object({
    email: z.string().email(),
    password: z.string({ required_error: "Password is recquired" }).min(6),
  });
  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    mutate(values, {
      onSuccess: (data) => {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        navigate("/", {
          replace: true,
        });
      },
      onError: (error) => {
        handleApiError(error);
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col text-white items-center p-6 px-8 bg-transparent rounded-xl gap-y-4"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">Log In</h1>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mx-auto">
            <Button
              type="submit"
              className={cn(
                "text-gray-700 bg-white hover:text-white hover:bg-gray-700 font-medium",
                isPending && !isError ? "cursor-not-allowed" : ""
              )}
              disabled={isPending && !isError}
            >
              Login
            </Button>
          </div>
          <div className="text-sm font-normal text-center ">
            Don't have an account ?{" "}
            <Link className="underline" to={"/auth/register"}>
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default LoginForm;
