"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// issues: GitHub Issue配列, start/end: チャートの期間（日付文字列: 'YYYY-MM-DD'）
function getBurndownData(issues: any[], start: string, end: string) {
  // 日付リスト生成
  const days: string[] = [];
  let d = new Date(start);
  const endD = new Date(end);
  while (d <= endD) {
    days.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  // 各日付の残課題数を計算
  const total = issues.length;
  const closedMap: Record<string, number> = {};
  for (const issue of issues) {
    if (issue.closed_at) {
      const day = issue.closed_at.slice(0, 10);
      closedMap[day] = (closedMap[day] || 0) + 1;
    }
  }
  const burndown: number[] = [];
  let remain = total;
  for (const day of days) {
    burndown.push(remain);
    remain -= closedMap[day] || 0;
  }
  return { labels: days, data: burndown };
}

export default function BurndownChart({ issues }: { issues: any[] }) {
  // 期間自動決定: 最初の作成日〜最後のクローズ日
  const start = useMemo(() => {
    if (issues.length === 0) return '';
    return issues.reduce((min, i) => i.created_at < min ? i.created_at : min, issues[0].created_at).slice(0, 10);
  }, [issues]);
  const end = useMemo(() => {
    if (issues.length === 0) return '';
    return issues.reduce((max, i) => (i.closed_at && i.closed_at > max) ? i.closed_at : max, issues[0].created_at).slice(0, 10);
  }, [issues]);
  const burndown = useMemo(() => getBurndownData(issues, start, end), [issues, start, end]);

  if (!start || !end) return <div>バーンダウンデータなし</div>;

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>バーンダウンチャート</h2>
      <Line
        data={{
          labels: burndown.labels,
          datasets: [
            {
              label: '残課題数',
              data: burndown.data,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'バーンダウンチャート' },
          },
        }}
      />
    </div>
  );
}