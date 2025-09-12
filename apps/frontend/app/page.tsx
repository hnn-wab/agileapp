
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/authOptions';
import type { GitHubRepository } from '../../../packages/core/types/github';

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

  // 1. ユーザーリポジトリ
  const userReposRes = await octokit.repos.listForAuthenticatedUser({ per_page: 100 });
  const userRepos = userReposRes.data;

  // 2. 所属Org一覧
  const orgsRes = await octokit.orgs.listForAuthenticatedUser();
  let orgRepos: GitHubRepository[] = [];
  for (const org of orgsRes.data) {
    const reposRes = await octokit.repos.listForOrg({ org: org.login, per_page: 100 });
  orgRepos = orgRepos.concat(reposRes.data as GitHubRepository[]);
  }

  // 3. ユーザーリポジトリとOrgリポジトリをマージ（重複除去: idで）
  const allReposMap = new Map();
  [...userRepos, ...orgRepos].forEach(r => allReposMap.set(r.id, r));
  const allRepos = Array.from(allReposMap.values());

  const RepoDashboard = (await import('./repoDashboard')).default;
  return (
    <div style={{ padding: 20 }}>
      <RepoDashboard repos={allRepos} token={token} />
    </div>
  );
}