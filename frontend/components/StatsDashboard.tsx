import React from 'react';
import {
  dailyOpenCounts,
  actualLine,
  issueStateCount,
  storyPointStats,
  leadTimeStats,
  velocityStats,
  dailyProgress,
  groupedIssues,
  filteredIssues,
} from '../app/sample-stats-data';

export const StatsDashboard: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto grid gap-8 p-4">
      {/* 日別のopen件数 */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-bold mb-2">日別のopen件数</h2>
        <table className="w-full text-sm border mb-2">
          <thead>
            <tr>
              <th className="border px-2 py-1">日付</th>
              <th className="border px-2 py-1">Open件数</th>
            </tr>
          </thead>
          <tbody>
            {dailyOpenCounts.map((row) => (
              <tr key={row.date}>
                <td className="border px-2 py-1">{row.date}</td>
                <td className="border px-2 py-1">{row.open}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 日別の実績線 */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-bold mb-2">日別の実績線（バーンダウン値）</h2>
        <table className="w-full text-sm border mb-2">
          <thead>
            <tr>
              <th className="border px-2 py-1">日付</th>
              <th className="border px-2 py-1">値</th>
            </tr>
          </thead>
          <tbody>
            {actualLine.map((row) => (
              <tr key={row.date}>
                <td className="border px-2 py-1">{row.date}</td>
                <td className="border px-2 py-1">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Issueの状態集計 */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-bold mb-2">Issueの状態集計</h2>
        <div className="flex gap-8">
          <div>Open: <span className="font-mono">{issueStateCount.open}</span></div>
          <div>Closed: <span className="font-mono">{issueStateCount.closed}</span></div>
        </div>
      </section>

      {/* ストーリーポイント */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-bold mb-2">ストーリーポイント統計</h2>
        <div className="flex gap-8">
          <div>合計: <span className="font-mono">{storyPointStats.total}</span></div>
          <div>残: <span className="font-mono">{storyPointStats.remaining}</span></div>
          <div>完了: <span className="font-mono">{storyPointStats.completed}</span></div>
        </div>
      </section>

      {/* リードタイム */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-bold mb-2">リードタイム統計</h2>
        <div className="flex gap-8">
          <div>平均: <span className="font-mono">{leadTimeStats.average}</span></div>
          <div>最小: <span className="font-mono">{leadTimeStats.min}</span></div>
          <div>最大: <span className="font-mono">{leadTimeStats.max}</span></div>
        </div>
      </section>

      {/* ベロシティ */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-bold mb-2">ベロシティ統計</h2>
        <div className="flex gap-8">
          <div>平均: <span className="font-mono">{velocityStats.average}</span></div>
          <div>直近: <span className="font-mono">{velocityStats.recent}</span></div>
        </div>
      </section>

      {/* 日別進捗 */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-bold mb-2">日別進捗</h2>
        <table className="w-full text-sm border mb-2">
          <thead>
            <tr>
              <th className="border px-2 py-1">日付</th>
              <th className="border px-2 py-1">完了</th>
              <th className="border px-2 py-1">残</th>
            </tr>
          </thead>
          <tbody>
            {dailyProgress.map((row) => (
              <tr key={row.date}>
                <td className="border px-2 py-1">{row.date}</td>
                <td className="border px-2 py-1">{row.completed}</td>
                <td className="border px-2 py-1">{row.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* グルーピング */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-bold mb-2">グルーピング結果</h2>
        <ul className="flex gap-8">
          {groupedIssues.map((g) => (
            <li key={g.group}>{g.group}: <span className="font-mono">{g.count}</span></li>
          ))}
        </ul>
      </section>

      {/* フィルタリング */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-bold mb-2">フィルタリング結果</h2>
        <ul>
          {filteredIssues.map((issue) => (
            <li key={issue.id}>{issue.title} <span className="text-xs text-gray-500">[{issue.state}]</span></li>
          ))}
        </ul>
      </section>
    </div>
  );
};