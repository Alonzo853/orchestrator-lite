export type WorkflowStep =
  | {
      id: string;
      type: "task";
      taskName: string;
      next?: string;
    }
  | {
      id: string;
      type: "delay";
      durationMs: number;
      next?: string;
    };

export type WorkflowDefinition = {
  steps: WorkflowStep[];
};

export type WorkflowRunState =
  | "pending"
  | "running"
  | "completed"
  | "failed";
