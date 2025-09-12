import { fetchIssues } from '../lib/githubApi';
import type { GitHubIssue } from '../../../packages/core/types/github';

export default async function GitHubIssuesDemo({ owner, repo, token }: { owner: string; repo: string; token: string }) {
  const issues = await fetchIssues(owner, repo, token);

  return (
    <div className="bg-white rounded shadow p-4 my-8">
      <h2 className="font-bold mb-2">GitHub Issues ({owner}/{repo})</h2>
      <ul>
  {issues.map((issue: GitHubIssue) => (
          <li key={issue.id}>
            <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="underline">
              #{issue.number}: {issue.title}
            </a>
            <span className="ml-2 text-xs text-gray-500">[{issue.state}]</span>
          </li>
        ))}
      </ul>
    </div>
  );
}