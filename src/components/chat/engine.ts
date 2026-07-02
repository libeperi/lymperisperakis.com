export type ModelChoice = {
  id: string;
  label: string;
  shortLabel: string;
  note: string;
};

// `openrouter/free` is a router that picks a random model from OpenRouter's
// free tier per request. The actual model used is reported back in the
// streaming response's `model` field.
// https://openrouter.ai/openrouter/free
export const FREE_ROUTER: ModelChoice = {
  id: "openrouter/free",
  label: "Random free model",
  shortLabel: "Free router",
  note: "Picks a random free model from OpenRouter for each message.",
};

export const DEFAULT_MODEL_ID = FREE_ROUTER.id;

// Strip OpenRouter's `:free` / `:nitro` etc. suffixes for display.
export function prettyModelName(id: string): string {
  return id.split(":")[0];
}
