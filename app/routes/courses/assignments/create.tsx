import { useLoaderData, Form, useNavigation, redirect, useActionData } from "react-router";
import type { Route } from ".react-router/types/app/routes/courses/assignments/+types/create";
import { PageHeader, PageContent } from "~/components/layouts/main-layout";
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

export const loader = async ({ request }: Route.LoaderArgs) => {
  const supabaseUser = await requireUser(request);
  const user = await getUserById(supabaseUser.id);
  return {
    user: user,
  }
}

const createAssignmentSchema = zod.object({
  name: zod
    .string()
    .min(2, {
      message: "Assignment name must be at least 2 characters.",
    })
    .max(100, {
      message: "Assignment name must not be longer than 100 characters.",
    }),
  publish_date: zod.coerce.date({
    required_error: "Publish date is required.",
  }),
  submission_end_date: zod.coerce.date({
    required_error: "Submission end date is required.",
  }),
  feedback_start_date: zod.coerce.date({
    required_error: "Feedback start date is required.",
  }),
  feedback_end_date: zod.coerce.date({
    required_error: "Feedback end date is required.",
  }),
  peer_grades_required: zod
    .number()
    .min(1, {
      message: "At least 1 peer grade is required.",
    })
    .max(10, {
      message: "Maximum 10 peer grades allowed.",
    }),
  is_anonymous: zod.boolean(),
  max_score: zod
    .number()
    .min(1, {
      message: "Maximum score must be at least 1.",
    }),
  num_annotations: zod
    .number()
    .min(0, {
      message: "Number of annotations cannot be negative.",
    }),
  num_numeric_questions: zod
    .number()
    .min(0, {
      message: "Number of numeric questions cannot be negative.",
    }),
  num_text_questions: zod
    .number()
    .min(0, {
      message: "Number of text questions cannot be negative.",
    }),
});

type CreateAssignmentFormData = zod.infer<typeof createAssignmentSchema>;
const resolver = zodResolver(createAssignmentSchema);

export const action = async ({ request }: Route.ActionArgs) => {
  const { errors, data, receivedValues: defaultValues } =
    await getValidatedFormData<CreateAssignmentFormData>(request, resolver);
  if (errors) {
    return ({ errors, defaultValues });
  }
  const supabaseUser = await requireUser(request);
  const assignment_id = crypto.randomUUID();
  const { error } = await createAssignment(
    assignment_id,
    data.name,
    data.publish_date,
    data.submission_end_date,
    data.feedback_start_date,
    data.feedback_end_date,
    data.peer_grades_required,
    data.is_anonymous,
    data.max_score,
    data.num_annotations,
    data.num_numeric_questions,
    data.num_text_questions
  );

  if (error) {
    return { error: error.message };
  }

  return redirect(`/assignments/${assignment_id}`);
}

export default function Create() {
  const data = useLoaderData<typeof loader>();
  const actionResponse = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === "/assignments/create";

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
      peer_grades_required: 3,
      is_anonymous: true,
      max_score: 100,
      num_annotations: 0,
      num_numeric_questions: 0,
      num_text_questions: 0,
    },
  });

  const [submissionDates, setSubmissionDates] = React.useState<DateRange | undefined>();
  const [feedbackDates, setFeedbackDates] = React.useState<DateRange | undefined>();
  const [publishDate, setPublishDate] = React.useState<Date>();

  React.useEffect(() => {
    if (publishDate) {
      setValue('publish_date', publishDate);
    }
    if (submissionDates?.from) {
      setValue('submission_end_date', submissionDates.to || submissionDates.from);
    }
    if (feedbackDates?.from) {
      setValue('feedback_start_date', feedbackDates.from);
      setValue('feedback_end_date', feedbackDates.to || feedbackDates.from);
    }
  }, [publishDate, submissionDates, feedbackDates, setValue]);

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
      <PageHeader>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Create Assignment</h1>
      </PageHeader>
      <PageContent>
        <div className="flex-1 lg:max-w-2xl">
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
                <Label>Publish Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !publishDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {publishDate ? format(publishDate, "LLL dd, y") : "Select publish date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={publishDate}
                      onSelect={setPublishDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
              </div>

              <div className="grid gap-2">
                <Label>Feedback Period</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !feedbackDates && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {feedbackDates?.from ? (
                        feedbackDates.to ? (
                          <>
                            {format(feedbackDates.from, "LLL dd, y")} -{" "}
                            {format(feedbackDates.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(feedbackDates.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Select feedback period</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={feedbackDates?.from}
                      selected={feedbackDates}
                      onSelect={setFeedbackDates}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label>Number of Required Peer Grades</Label>
                <Controller
                  name="peer_grades_required"
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
                {errors.peer_grades_required && (
                  <Label className="text-destructive">{errors.peer_grades_required.message}</Label>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Label>Anonymous Grading</Label>
                <Switch {...register("is_anonymous")} />
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
                <Label>Number of Annotations Required</Label>
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

              <div className="grid gap-2">
                <Label>Number of Numeric Questions</Label>
                <Controller
                  name="num_numeric_questions"
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
                {errors.num_numeric_questions && (
                  <Label className="text-destructive">{errors.num_numeric_questions.message}</Label>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Number of Text Questions</Label>
                <Controller
                  name="num_text_questions"
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
                {errors.num_text_questions && (
                  <Label className="text-destructive">{errors.num_text_questions.message}</Label>
                )}
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
      </PageContent>
    </>
  );
}