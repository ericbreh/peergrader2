import { useLoaderData, Form, useNavigation, redirect, useActionData } from "react-router";
import type { Route } from ".react-router/types/app/routes/courses/assignments/+types/create";
import { PageContent, PageTitle } from "~/components/layouts/main-layout";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle, Loader2, CalendarIcon } from "lucide-react";
import { requireUser } from "~/lib/auth.supabase.server";
import { createAssignment, getUserById } from "~/lib/queries.server";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import * as React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { useRemixForm, getValidatedFormData } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Controller } from "react-hook-form";
import { Textarea } from "~/components/ui/textarea";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const supabaseUser = await requireUser(request);
  const user = await getUserById(supabaseUser.id);
  return {
    user: user,
    course_id: params.course_id
  }
}

// name, anonymous_grading, start_date_submission, end_date_submission, start_date_grading, end_date_grading, max_score, num_peergrades, number_input, num_annotations, description
const createAssignmentSchema = zod.object({
  name: zod
    .string()
    .min(2, {
      message: "Assignment name must be at least 2 characters.",
    })
    .max(100, {
      message: "Assignment name must not be longer than 100 characters.",
    }),
  anonymous_grading: zod.boolean(),
  start_date_submission: zod.coerce.date({
    required_error: "Submission start date is required.",
  }),
  end_date_submission: zod.coerce.date({
    required_error: "Submission end date is required.",
  }),
  start_date_grading: zod.coerce.date({
    required_error: "Grading start date is required.",
  }),
  end_date_grading: zod.coerce.date({
    required_error: "Grading end date is required.",
  }),
  max_score: zod
    .number()
    .min(1, {
      message: "Maximum score must be at least 1.",
    }),
  num_peergrades: zod
    .number()
    .min(0, {
      message: "Number of Peer Grades cannot be negative.",
    }),
  number_input: zod.boolean(),
  num_annotations: zod
    .number()
    .min(0, {
      message: "Number of annotations cannot be negative.",
    }),
  description: zod
    .string()
});

type CreateAssignmentFormData = zod.infer<typeof createAssignmentSchema>;
const resolver = zodResolver(createAssignmentSchema);

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { errors, data, receivedValues: defaultValues } =
    await getValidatedFormData<CreateAssignmentFormData>(request, resolver);
  if (errors) {
    return ({ errors, defaultValues });
  }
  const supabaseUser = await requireUser(request);
  const asgn_id = crypto.randomUUID();
  const { error } = await createAssignment(
    asgn_id,
    data.name,
    supabaseUser.id,
    params.course_id,
    data.anonymous_grading,
    data.start_date_submission,
    data.end_date_submission,
    data.start_date_grading,
    data.end_date_grading,
    data.max_score,
    data.num_peergrades,
    data.number_input,
    data.num_annotations,
    data.description
  );

  if (error) {
    return { error: error.message };
  }

  return redirect(`/courses/${params.course_id}/assignments/${asgn_id}`);
}

// owner only
export default function CreateAssignment() {
  const data = useLoaderData<typeof loader>();
  const actionResponse = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === `/courses/${data.course_id}/assignments/create`;

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    control,
  } = useRemixForm<CreateAssignmentFormData>({
    mode: "onSubmit",
    resolver,
    defaultValues: {
      anonymous_grading: true,
      max_score: 100,
      num_peergrades: 3,
      number_input: false,
      num_annotations: 0,
    },
  });

  const [submissionDates, setSubmissionDates] = React.useState<DateRange | undefined>();
  const [gradingDates, setGradingDates] = React.useState<DateRange | undefined>();

  React.useEffect(() => {
    if (submissionDates?.from) {
      setValue('start_date_submission', submissionDates.from);
    }
    if (submissionDates?.to) {
      setValue('end_date_submission', submissionDates.to);
    }
  }, [submissionDates, setValue]);

  React.useEffect(() => {
    if (gradingDates?.from) {
      setValue('start_date_grading', gradingDates.from);
    }
    if (gradingDates?.to) {
      setValue('end_date_grading', gradingDates.to);
    }
  }, [gradingDates, setValue]);

  // TODO: check if user is owner of course
  if (!data.user?.is_teacher) {
    return (
      <PageContent>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            You are not authorized to create assignments.
          </AlertDescription>
        </Alert>
      </PageContent>
    );
  }

  return (
    <>
      <PageTitle>Create Assignment</PageTitle>
      <div className="lg:max-w-2xl">
        <Form onSubmit={handleSubmit} method="POST">
          <div className="flex flex-col gap-6">

            <div className="grid gap-2">
              <Label>Assignment Name</Label>
              <Input
                type="text"
                placeholder="eg. Midterm Essay"
                {...register("name")}
              />
              {errors.name && (
                <Label className="text-destructive">{errors.name.message}</Label>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                placeholder="eg. Write an essay about..."
                {...register("description")}
              />
              {errors.description && (
                <Label className="text-destructive">{errors.description.message}</Label>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Submission Period</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !submissionDates && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {submissionDates?.from ? (
                      submissionDates.to ? (
                        <>
                          {format(submissionDates.from, "LLL dd, y")} -{" "}
                          {format(submissionDates.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(submissionDates.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Select submission period</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={submissionDates?.from}
                    selected={submissionDates}
                    onSelect={setSubmissionDates}
                  />
                </PopoverContent>
              </Popover>
              {(errors.start_date_submission || errors.end_date_submission) && (
                <Label className="text-destructive">{errors.start_date_submission?.message || errors.end_date_submission?.message}</Label>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Grading Period</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !gradingDates && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {gradingDates?.from ? (
                      gradingDates.to ? (
                        <>
                          {format(gradingDates.from, "LLL dd, y")} -{" "}
                          {format(gradingDates.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(gradingDates.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Select Grading period</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={gradingDates?.from}
                    selected={gradingDates}
                    onSelect={setGradingDates}
                  />
                </PopoverContent>
              </Popover>
              {(errors.start_date_grading || errors.end_date_grading) && (
                <Label className="text-destructive">{errors.start_date_grading?.message || errors.end_date_grading?.message}</Label>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Maximum Score</Label>
              <Controller
                name="max_score"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!isNaN(Number(value))) {
                        field.onChange(Number(value));
                      }
                    }}
                  />
                )}
              />
              {errors.max_score && (
                <Label className="text-destructive">{errors.max_score.message}</Label>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Number of Required Peer Grades</Label>
              <Controller
                name="num_peergrades"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!isNaN(Number(value))) {
                        field.onChange(Number(value));
                      }
                    }}
                  />
                )}
              />
              {errors.num_peergrades && (
                <Label className="text-destructive">{errors.num_peergrades.message}</Label>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Number of Required Annotations</Label>
              <Controller
                name="num_annotations"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!isNaN(Number(value))) {
                        field.onChange(Number(value));
                      }
                    }}
                  />
                )}
              />
              {errors.num_annotations && (
                <Label className="text-destructive">{errors.num_annotations.message}</Label>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Label>Anonymous Grading</Label>
              <Switch {...register("anonymous_grading")} />
            </div>

            <div className="flex items-center gap-2">
              <Label>Number Input</Label>
              <Switch {...register("number_input")} />
            </div>

            <Button className="self-start" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Assignment...
                </>
              ) : (
                "Create Assignment"
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
    </>
  );
}