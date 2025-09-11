
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  // NextAuthのセッションからアクセストークンを取得
  const session = await getServerSession(authOptions);
  const token = session?.accessToken || '';
  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        <h2>GitHubにログインしてください</h2>
      </div>
    );
  }
  const { createGitHubClient } = await import('../lib/githubClient');
  const octokit = createGitHubClient(token);
  const repos = await octokit.repos.listForAuthenticatedUser({ per_page: 100 });

  const RepoDashboard = (await import('./repoDashboard')).default;
  return (
    <div style={{ padding: 20 }}>
      <RepoDashboard repos={repos.data} token={token} />
    </div>
  );
}