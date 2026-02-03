/**
 * Billing API: plan, usage, history.
 * Mock responses for now.
 */

export async function getCurrentPlan() {
  return { name: 'Free', limits: {} }
}

export async function getUsage() {
  return { conversations: 0, agents: 0 }
}

export async function getBillingHistory() {
  return []
}
