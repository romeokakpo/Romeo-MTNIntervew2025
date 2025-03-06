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
import { register } from "@/api/authApi";
import { usePostData } from "@/hooks/fetchData";
import { handleApiError } from "@/utils/handleErrors";
import { PasswordInput } from "../../passwordInput.jsx/PasswordInput";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = usePostData("registerUser", register);

  const FormSchema = z
    .object({
      name: z.string({ required_error: "Name is recqueried" }).min(6),
      email: z.string().email(),
      password: z.string({ required_error: "Le mot de passe est recquis" }),
      confirmPassword: z.string({
        required_error: "La confirmation du mot de passe est recquise",
      }),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Les mots de passe ne correspondent pas",
          path: ["confirmPassword"],
        });
      }
    });
  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    mutate(values, {
      onSuccess: () => {
        toast("Registration successful", {
          type: "success",
        });
        navigate("/auth/login", {
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
        className="flex flex-col items-center text-white p-6 px-8 bg-transparent rounded-xl gap-y-4"
      >
        <h1 className="text-xl font-semibold text-center mb-4">
          Inscrivez vous
        </h1>
        <div className="flex flex-col gap-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <PasswordInput {...field} placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <PasswordInput {...field} placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mx-auto">
            <Button type="submit" className="text-white" disabled={isPending}>
              Inscription
            </Button>
          </div>
          <div className="text-sm font-normal text-center ">
            Vous avez déjà un compte ?{" "}
            <Link className="underline" to={"/auth/login"}>
              Connectez-vous
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
