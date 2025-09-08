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
  // 期間: 今日から過去6ヶ月（180日）
  const end = useMemo(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  }, []);
  const start = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 179); // 今日含めて180日間
    return d.toISOString().slice(0, 10);
  }, []);
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
              tension: 0.2,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
            title: { display: false },
          },
          scales: {
            x: { title: { display: true, text: '日付' } },
            y: { title: { display: true, text: '残課題数' }, beginAtZero: true },
          },
        }}
      />
    </div>
  );
}