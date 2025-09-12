"use client";
import EmptyState from "../components/EmptyState";
import { useState, useEffect } from "react";

// エラー型
type DashboardError = string | null;
import { fetchIssues } from "../lib/githubApi";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import dynamic from "next/dynamic";

// チャートはSSR不可なのでdynamic import
const BurndownChart = dynamic(() => import("./BurndownChart"), { ssr: false });

type Repo = {
  id: number;
  name: string;
  owner: { login: string };
};

type Props = {
  repos: Repo[];
  token: string;
};

export default function RepoDashboard({ repos, token }: Props) {
  const [selected, setSelected] = useState(0); // index
  const repo = repos[selected];
  const [repoInfo, setRepoInfo] = useState<any>(null);
  const [error, setError] = useState<DashboardError>(null);
  const [issues, setIssues] = useState<any[]>([]);
  const [commits, setCommits] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);
  const [contributors, setContributors] = useState<any[]>([]);
  const [pulls, setPulls] = useState<any[]>([]);
  const [releases, setReleases] = useState<any[]>([]);
  const [tree, setTree] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [ownerProfile, setOwnerProfile] = useState<any>(null);
  const [issueFilter, setIssueFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [issuePage, setIssuePage] = useState(1);
  const issuesPerPage = 20;

  useEffect(() => {
    if (!repo) return;
    const fetchAll = async () => {
      setError(null);
      try {
        const { createGitHubClient } = await import("../lib/githubClient");
        const octokit = createGitHubClient(token);
        // リポジトリ情報
        const repoRes = await octokit.repos.get({ owner: repo.owner.login, repo: repo.name });
        setRepoInfo(repoRes.data);
        // オーナープロフィール
        setOwnerProfile((await octokit.users.getByUsername({ username: repo.owner.login })).data);
        // Issue
        setIssues(await fetchIssues(repo.owner.login, repo.name, token));
        // PR
        setPulls((await octokit.pulls.list({ owner: repo.owner.login, repo: repo.name, state: "all", per_page: 30 })).data);
        // コミット
        setCommits((await octokit.repos.listCommits({ owner: repo.owner.login, repo: repo.name })).data);
        // ブランチ
        setBranches((await octokit.repos.listBranches({ owner: repo.owner.login, repo: repo.name })).data);
        // ラベル
        setLabels((await octokit.issues.listLabelsForRepo({ owner: repo.owner.login, repo: repo.name })).data);
        // コントリビューター
        setContributors((await octokit.repos.listContributors({ owner: repo.owner.login, repo: repo.name })).data);
        // リリース
        setReleases((await octokit.repos.listReleases({ owner: repo.owner.login, repo: repo.name })).data);
        // マイルストーン
        setMilestones((await octokit.issues.listMilestones({ owner: repo.owner.login, repo: repo.name })).data);
        // ツリー（デフォルトブランチ）
        if (repoRes.data.default_branch) {
          const treeRes = await octokit.git.getTree({ owner: repo.owner.login, repo: repo.name, tree_sha: repoRes.data.default_branch, recursive: "true" });
          setTree(treeRes.data.tree || []);
        } else {
          setTree([]);
        }
      } catch (e: any) {
        setError(e?.message || "データ取得に失敗しました");
      }
    };
    fetchAll();
  }, [selected, repo, token]);

  return (
    <div>
  {error && <ErrorMessage message={error} />}
      <h2>自分がアクセスできるリポジトリ一覧</h2>
      <select value={selected} onChange={e => setSelected(Number(e.target.value))}>
        {repos.map((r, i) => (
          <option value={i} key={r.id}>
            {r.owner.login} / {r.name}
          </option>
        ))}
      </select>

      {/* ローディング表示: repo選択済みでrepoInfo等が未取得の場合 */}
      {repo && !repoInfo && (
        <div style={{ margin: '32px 0' }}>
          <LoadingSpinner text="リポジトリ情報を取得中..." />
        </div>
      )}

      {repo && repoInfo && (
        <>
          <h2 style={{ marginTop: 32 }}>リポジトリ情報: {repo.owner.login} / {repo.name}</h2>
          <ul>
            <li>説明: {repoInfo.description}</li>
            <li>スター: {repoInfo.stargazers_count}</li>
            <li>フォーク: {repoInfo.forks_count}</li>
            <li>ウォッチ数: {repoInfo.subscribers_count}</li>
            <li>作成日: {repoInfo.created_at}</li>
            <li>更新日: {repoInfo.updated_at}</li>
            <li>オーナー: {repoInfo.owner?.login}</li>
          </ul>

          <h2>オーナープロフィール</h2>
          {ownerProfile && (
            <ul>
              <li>名前: {ownerProfile.name || ownerProfile.login}</li>
              <li>アバター: <img src={ownerProfile.avatar_url} alt="avatar" width={32} /></li>
              <li>公開リポジトリ数: {ownerProfile.public_repos}</li>
              <li>フォロワー数: {ownerProfile.followers}</li>
            </ul>
          )}

          <h2>リリース一覧</h2>
          {releases.length === 0 ? (
            <EmptyState text="リリースはありません" />
          ) : (
            <ul>
              {releases.map((rel: any) => (
                <li key={rel.id}>
                  {rel.tag_name}（{rel.name}）: {rel.published_at} <br />
                  本文: {rel.body}
                  <ul>
                    {rel.assets.map((a: any) => (
                      <li key={a.id}>アセット: {a.name}（{a.browser_download_url}）</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}

          <BurndownChart issues={issues} />

          <h2>Issue一覧</h2>
          <div style={{ marginBottom: 8 }}>
            <label>
              <input type="radio" name="issueFilter" value="all" checked={issueFilter === 'all'} onChange={() => setIssueFilter('all')} /> 全て
            </label>
            <label style={{ marginLeft: 12 }}>
              <input type="radio" name="issueFilter" value="open" checked={issueFilter === 'open'} onChange={() => setIssueFilter('open')} /> Open
            </label>
            <label style={{ marginLeft: 12 }}>
              <input type="radio" name="issueFilter" value="closed" checked={issueFilter === 'closed'} onChange={() => setIssueFilter('closed')} /> Closed
            </label>
          </div>
          {(() => {
            const filtered = issues.filter(issue => issueFilter === 'all' ? true : issue.state === issueFilter);
            return (
              <>
                {filtered.length === 0 ? (
                  <EmptyState text="Issueはありません" />
                ) : (
                  <ul>
                    {filtered
                      .slice((issuePage - 1) * issuesPerPage, issuePage * issuesPerPage)
                      .map((issue: any) => (
                        <li key={issue.id}>
                          #{issue.number}: {issue.title} [{issue.state}]<br />
                          作成日: {issue.created_at} / 更新日: {issue.updated_at}<br />
                          担当者: {issue.assignee?.login || 'なし'}<br />
                          マイルストーン: {issue.milestone?.title || 'なし'}<br />
                          コメント数: {issue.comments}<br />
                          本文: {issue.body?.slice(0, 100)}
                        </li>
                      ))}
                  </ul>
                )}
              </>
            );
          })()}
          <div style={{ margin: '12px 0' }}>
            <button onClick={() => setIssuePage(p => Math.max(1, p - 1))} disabled={issuePage === 1}>前へ</button>
            <span style={{ margin: '0 8px' }}>ページ {issuePage} / {Math.max(1, Math.ceil(issues.filter(issue => issueFilter === 'all' ? true : issue.state === issueFilter).length / issuesPerPage))}</span>
            <button onClick={() => setIssuePage(p => p + 1)}
              disabled={issuePage >= Math.ceil(issues.filter(issue => issueFilter === 'all' ? true : issue.state === issueFilter).length / issuesPerPage)}>
              次へ
            </button>
          </div>

          <h2>Pull Request一覧</h2>
          <ul>
            {pulls.map((pr: any) => (
              <li key={pr.id}>
                #{pr.number}: {pr.title} [{pr.state}]<br />
                作成日: {pr.created_at} / マージ日: {pr.merged_at || '未マージ'}<br />
                作成者: {pr.user?.login}<br />
                レビュー数: {pr.requested_reviewers?.length ?? 0}<br />
                コメント数: {pr.comments}
              </li>
            ))}
          </ul>

          <h2>コミット履歴</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="min-w-full text-sm border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 border">SHA</th>
                  <th className="px-2 py-1 border">作成者</th>
                  <th className="px-2 py-1 border">日付</th>
                  <th className="px-2 py-1 border">メッセージ</th>
                </tr>
              </thead>
              <tbody>
                {commits.slice(0, 10).map((commit: any) => (
                  <tr key={commit.sha} className="border-b">
                    <td className="px-2 py-1 border font-mono">
                      <a href={commit.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        {commit.sha.slice(0, 7)}
                      </a>
                    </td>
                    <td className="px-2 py-1 border">{commit.commit.author.name}</td>
                    <td className="px-2 py-1 border">{new Date(commit.commit.author.date).toLocaleString()}</td>
                    <td className="px-2 py-1 border" title={commit.commit.message}>{commit.commit.message.length > 60 ? commit.commit.message.slice(0, 60) + '…' : commit.commit.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>コントリビューター一覧</h2>
          <ul>
            {contributors.map((c: any) => (
              <li key={c.id}>{c.login}（コミット数: {c.contributions}）</li>
            ))}
          </ul>

          <h2>ファイル/ディレクトリ構成（ツリー）</h2>
          <ul>
            {tree.map((item: any) => (
              <li key={item.sha + ':' + item.path}>{item.type}: {item.path}</li>
            ))}
          </ul>

          <h2>ラベル一覧</h2>
          <ul>
            {labels.map((l: any) => (
              <li key={l.id}>{l.name}（{l.color}）: {l.description}</li>
            ))}
          </ul>

          <h2>マイルストーン一覧（タイトル・進捗・期限）</h2>
          <ul>
            {milestones.map((m: any) => (
              <li key={m.id}>{m.title}（進捗: {m.open_issues}/{m.closed_issues}、期限: {m.due_on || 'なし'}）</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}