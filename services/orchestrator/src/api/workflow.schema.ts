import { z } from "zod";

/**
 * A task in a workflow DAG
 */
export const TaskSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  dependsOn: z.array(z.string()).default([]),
  retry: z
    .object({
      maxAttempts: z.number().int().positive().default(3),
      backoffSeconds: z.number().int().positive().default(5),
    })
    .optional(),
});

/**
 * Workflow definition
 */
export const WorkflowSchema = z.object({
  name: z.string().min(1),
  version: z.number().int().positive(),
  tasks: z.array(TaskSchema).min(1),
});

export type WorkflowDefinition = z.infer<typeof WorkflowSchema>;
