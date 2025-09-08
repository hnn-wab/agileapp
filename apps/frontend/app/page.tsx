import { createGitHubClient } from '../lib/githubClient';
import RepoDashboard from './repoDashboard';

export default async function Home() {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || '';
  const octokit = createGitHubClient(token);
  const repos = await octokit.repos.listForAuthenticatedUser({ per_page: 100 });

  return (
    <div style={{ padding: 20 }}>
      <RepoDashboard repos={repos.data} token={token} />
    </div>
  );
}