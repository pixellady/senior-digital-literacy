export type TutorGoalId =
  | "send_email_daughter"
  | "video_call_family"
  | "find_photo_phone";

export type TutorGoal = {
  id: TutorGoalId;
  title: string;
  hint: string;
};

/** Partial User tasks for Tutor proof slice (local tutorial library RAG). */
export const TUTOR_GOALS: readonly TutorGoal[] = [
  {
    id: "send_email_daughter",
    title: "Send an email to my daughter",
    hint: "One step at a time. You can pause anytime.",
  },
  {
    id: "video_call_family",
    title: "Join a video call with family",
    hint: "One step at a time. You can pause anytime.",
  },
  {
    id: "find_photo_phone",
    title: "Find a photo on my phone",
    hint: "One step at a time. You can pause anytime.",
  },
] as const;

export function tutorGoalById(id: string | null): TutorGoal | undefined {
  return TUTOR_GOALS.find((goal) => goal.id === id);
}

export function tutorGoalTitle(id: string | null): string {
  return tutorGoalById(id)?.title ?? "";
}
