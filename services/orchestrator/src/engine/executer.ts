import { WorkflowDefinition, WorkflowStep } from "./types";
import { updateWorkflowRun } from "../db/workflows";

function findStep(def: WorkflowDefinition, stepId?: string): WorkflowStep {
  if (!stepId) return def.steps[0];
  const step = def.steps.find((s) => s.id === stepId);
  if (!step) throw new Error(`Step ${stepId} not found`);
  return step;
}

export async function executeWorkflowRun(
  runId: string,
  definition: WorkflowDefinition,
  currentStepId?: string,
  context: any = {}
) {
  let step = findStep(definition, currentStepId);

  while (step) {
    await updateWorkflowRun(runId, "running", step.id, context);

    if (step.type === "task") {
      // placeholder for real task execution
      console.log(`Executing task: ${step.taskName}`);
    }

    if (step.type === "delay") {
      await new Promise((r) => setTimeout(r, step.durationMs));
    }

    if (!step.next) {
      await updateWorkflowRun(runId, "completed");
      return;
    }

    step = findStep(definition, step.next);
  }
}
