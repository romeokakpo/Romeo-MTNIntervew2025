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
import { cn } from "@/lib/utils";
import { useFetchData, usePostData } from "@/hooks/fetchData";
import { handleApiError } from "@/utils/handleErrors";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { getAllUsers } from "@/api/usersApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTask } from "@/api/tasksApi";
import { useQueryClient } from "@tanstack/react-query";

const Newtask = ({ status, closeModal }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = usePostData("createTask", createTask);
  const { data, isPending: isPendingUser } = useFetchData(
    "getAllUsers",
    getAllUsers
  );

  const FormSchema = z.object({
    title: z.string({ required_error: "Title is required" }).min(10),
    description: z
      .string({ required_error: "Description is required" })
      .min(10, {
        message: "Description must be at least 10 characters.",
      })
      .max(160, {
        message: "Description must not be longer than 30 characters.",
      }),
    assigned_user: z
      .string({
        required_error: "Please select an email to display.",
      })
      .nullable(),
  });
  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
    },
  });
  async function onSubmit(values) {
    mutate(
      { ...values, status },
      {
        onSuccess: () => {
          toast("Task created successfully");
          form.reset();
          queryClient.invalidateQueries("getAllTasks");
          closeModal();
        },
        onError: (error) => {
          handleApiError(error);
        },
      }
    );
  }
  if (isPendingUser) return <div>Loading...</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col text-black items-center bg-transparent rounded-xl gap-y-4"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          Créer une tâche
        </h1>
        <div className="flex flex-col gap-6 w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Title</FormLabel>
                <FormControl>
                  <Input placeholder="My Task" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your Task description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isPendingUser && (
            <FormField
              control={form.control}
              name="assigned_user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Assign User</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger key={"selectTrigger"}>
                        <SelectValue placeholder="Assign user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data.map((user) => (
                        <SelectItem key={user.id} value={`${user.id}`}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="mx-auto">
            <Button
              type="submit"
              className={cn(
                "cursor-pointer",
                isPending ? "cursor-not-allowed" : ""
              )}
              disabled={isPending}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Newtask;
