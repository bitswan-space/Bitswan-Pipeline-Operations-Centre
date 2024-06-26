import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CreateDashboardEntrySchema } from "@/shared/schema/dashboard";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { HelpCircle, Loader } from "lucide-react";
import { type DashboardEntry } from "@/types/dashboard-hub";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDashboardEntry, updateDashboardEntry } from "./hooks";
import { toast } from "sonner";

type CreateDashboardEntryFormProps = {
  dashboardEntry?: DashboardEntry;
  onSuccessfulSubmit?: () => void;
};

export function CreateDashboardEntryForm(
  props: Readonly<CreateDashboardEntryFormProps>,
) {
  const { dashboardEntry, onSuccessfulSubmit } = props;

  const queryClient = useQueryClient();

  const handleInvalidateDashboardEntries = () => {
    queryClient
      .invalidateQueries({
        queryKey: ["dashboard-entries"],
      })
      .then(() => {
        console.log("Invalidated dashboard-entries query");
      })
      .catch((error) => {
        console.error("Error invalidating dashboard-entries query", error);
      });
  };

  const createDashboardEntryMutation = useMutation({
    mutationFn: createDashboardEntry,
    onSuccess: () => {
      console.log("Dashboard entry created");
      handleInvalidateDashboardEntries();
      toast.success("Dashboard entry created");
      onSuccessfulSubmit?.();
    },
    onError: (error) => {
      console.log("Error creating dashboard entry", error);
      toast.error("Error creating dashboard entry");
    },
  });

  const updateDashboardEntryMutation = useMutation({
    mutationFn: updateDashboardEntry,
    onSuccess: () => {
      handleInvalidateDashboardEntries();
      toast.success("Dashboard entry updated");
      onSuccessfulSubmit?.();
    },
    onError: (error) => {
      console.error("Error updating dashboard entry", error);
      toast.error("Error updating dashboard entry");
    },
  });

  const form = useForm<z.infer<typeof CreateDashboardEntrySchema>>({
    resolver: zodResolver(CreateDashboardEntrySchema),
    defaultValues: {
      dashboardName: dashboardEntry?.name ?? "",
      description: dashboardEntry?.description ?? "",
      url: dashboardEntry?.url ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof CreateDashboardEntrySchema>) {
    console.log("submitting");
    console.log(values);

    if (dashboardEntry) {
      updateDashboardEntryMutation.mutate({
        dashboardEntry: {
          id: dashboardEntry.id,
          name: values.dashboardName,
          description: values.description,
          url: values.url,
        },
      });
      return;
    }

    createDashboardEntryMutation.mutate({
      dashboardEntry: {
        name: values.dashboardName,
        description: values.description,
        url: values.url,
      },
    });
  }

  const isLoading =
    createDashboardEntryMutation.isLoading ||
    updateDashboardEntryMutation.isLoading;

  const isError =
    createDashboardEntryMutation.isError ||
    updateDashboardEntryMutation.isError;

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
        className="flex flex-col gap-4"
      >
        {isError && (
          <div className="w-full rounded border border-red-600 bg-red-400/30 px-4 py-2 text-sm text-red-600">
            Error occured while saving changes
          </div>
        )}
        <FormField
          control={form.control}
          name="dashboardName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Dashboard Name
                <HelpCircle
                  size={15}
                  className="mr-2"
                  xlinkTitle="This is the name configured for your gitops."
                />
                :
              </FormLabel>
              <FormControl>
                <Input placeholder="Example Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                URL
                <HelpCircle
                  size={15}
                  className="mr-2"
                  xlinkTitle="This is the name configured for your gitops."
                />
                :
              </FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
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
              <FormLabel className="flex gap-1">
                Description
                <HelpCircle
                  size={15}
                  className="mr-2"
                  xlinkTitle="This is the name configured for your gitops."
                />
                :
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description of the dashboard."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Save Entry
          {isLoading && (
            <span>
              <Loader size={20} className="ml-2 animate-spin" />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
