import { useLoaderData, Form, useNavigation, redirect, useActionData } from "react-router";
import type { Route } from ".react-router/types/app/routes/courses/+types/create";
import { PageContent, PageTitle } from "~/components/layouts/main-layout";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle, Loader2, CalendarIcon } from "lucide-react";
import { requireUser } from "~/lib/auth.supabase.server";
import { createCourse, getUserById } from "~/lib/queries.server";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import * as React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { useRemixForm, getValidatedFormData } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";


export const loader = async ({ request }: Route.LoaderArgs) => {
  const supabaseUser = await requireUser(request);
  const user = await getUserById(supabaseUser.id);
  return {
    user: user,
  }
}

const createCourseSchema = zod.object({
  number: zod
    .string()
    .min(1, {
      message: "Course number must be at least 1 characters.",
    })
    .max(20, {
      message: "Course number must not be longer than 20 characters.",
    }),
  name: zod
    .string()
    .min(2, {
      message: "Course name must be at least 2 characters.",
    })
    .max(100, {
      message: "Course name must not be longer than 100 characters.",
    }),
  start_date: zod.coerce.date({
    required_error: "Course start date is required.",
  }),
  end_date: zod.coerce.date({
    required_error: "Course end date is required.",
  }),
})

type CreateCourseFormData = zod.infer<typeof createCourseSchema>;
const resolver = zodResolver(createCourseSchema);

export const action = async ({ request }: Route.ActionArgs) => {
  const { errors, data, receivedValues: defaultValues } =
    await getValidatedFormData<CreateCourseFormData>(request, resolver);
  if (errors) {
    return ({ errors, defaultValues });
  }
  const supabaseUser = await requireUser(request);
  const course_id = crypto.randomUUID();
  const { error } = await createCourse(
    course_id,
    data.name,
    supabaseUser.id,
    data.number,
    data.start_date,
    data.end_date
  );

  if (error) {
    return { error: error.message };
  }

  return redirect(`/courses/${course_id}`);
}

// teacher only
export default function CreateCourse() {
  const data = useLoaderData<typeof loader>();
  const actionResponse = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === "/courses/create";

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useRemixForm<CreateCourseFormData>({
    mode: "onSubmit",
    resolver,
  });

  const [date, setDate] = React.useState<DateRange | undefined>();

  React.useEffect(() => {
    if (date?.from) {
      setValue('start_date', date.from);
    }
    if (date?.to) {
      setValue('end_date', date.to);
    }
  }, [date, setValue]);

  if (!data.user?.is_teacher) {
    return (
      <PageContent>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            You are not authorized to create courses.
          </AlertDescription>
        </Alert>
      </PageContent>
    );
  }

  return (
    <>
      <PageContent>
        <div className="flex-1 lg:max-w-2xl">
          <PageTitle className="border-b pb-2">Create Course</PageTitle>
          <Form onSubmit={handleSubmit} method="POST">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Course Number</Label>
                <Input
                  type="text"
                  placeholder="eg. CSE 101"
                  {...register("number")}
                />
                {errors.number && (
                  <Label className="text-destructive">{errors.number.message}</Label>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Course Name</Label>
                <Input
                  type="text"
                  placeholder="eg. Intro to Computer Science"
                  {...register("name")}
                />
                {errors.name && (
                  <Label className="text-destructive">{errors.name.message}</Label>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Course Duration</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Select course dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={3}
                    />
                  </PopoverContent>
                </Popover>
                {(errors.start_date || errors.end_date) && (
                  <Label className="text-destructive">{errors.start_date?.message || errors.end_date?.message}</Label>
                )}
              </div>
              
              <Button className="self-start" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Course...
                  </>
                ) : (
                  "Create Course"
                )}
              </Button>
            </div>

          </Form>
          {actionResponse?.error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>{actionResponse.error}</AlertTitle>
            </Alert>
          )}
        </div>
      </PageContent>
    </>
  );
}
