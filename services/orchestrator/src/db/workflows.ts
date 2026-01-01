import { getPool } from "./pool";
import { WorkflowDefinition, WorkflowRunState } from "../engine/types";

export async function createWorkflow(
  name: string,
  definition: WorkflowDefinition
) {
  const pool = getPool();
  const res = await pool.query(
    `INSERT INTO workflows (name, definition)
     VALUES ($1, $2)
     RETURNING *`,
    [name, definition]
  );
  return res.rows[0];
}

export async function startWorkflowRun(workflowId: string) {
  const pool = getPool();
  const res = await pool.query(
    `INSERT INTO workflow_runs (workflow_id, state)
     VALUES ($1, 'pending')
     RETURNING *`,
    [workflowId]
  );
  return res.rows[0];
}

export async function updateWorkflowRun(
  runId: string,
  state: WorkflowRunState,
  currentStep?: string,
  context?: any
) {
  const pool = getPool();
  await pool.query(
    `UPDATE workflow_runs
     SET state = $2,
         current_step = $3,
         context = COALESCE($4, context),
         updated_at = now()
     WHERE id = $1`,
    [runId, state, currentStep, context]
  );
}
