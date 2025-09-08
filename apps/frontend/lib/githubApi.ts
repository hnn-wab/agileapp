import { createGitHubClient } from "./githubClient";

export async function fetchIssues(owner: string, repo: string, token: string) {
  const octokit = createGitHubClient(token);
  const res = await octokit.issues.listForRepo({ owner, repo, state: "all" });
  return res.data;
}