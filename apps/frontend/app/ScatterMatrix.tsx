import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  LineElement,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { useMemo } from 'react';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, LineElement, annotationPlugin);

export type ScatterDataPoint = {
  x: number;
  y: number;
  label?: string;
  id?: number;
  category?: string;
};

export type ScatterMatrixProps = {
  data: ScatterDataPoint[];
};

export default function ScatterMatrix({ data }: ScatterMatrixProps) {
  const chartData = useMemo(() => ({
    datasets: [
      {
        label: 'タスク',
        data: data.map(d => ({ x: d.x, y: d.y, label: d.label, id: d.id })),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        pointRadius: 7,
      },
    ],
  }), [data]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const d = data[ctx.dataIndex];
            return `${d.label ?? ''} (バリュー: ${d.y}, エフォート: ${d.x})`;
          },
        },
      },
      annotation: {
        annotations: {
          xLine: {
            type: 'line' as const,
            xMin: 2.5,
            xMax: 2.5,
            yMin: -0.3,
            yMax: 6.3,
            borderColor: '#000',
            borderWidth: 2,
            label: { display: false },
          },
          yLine: {
            type: 'line' as const,
            xMin: -0.3,
            xMax: 5.3,
            yMin: 3,
            yMax: 3,
            borderColor: '#000',
            borderWidth: 2,
            label: { display: false },
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear" as const,
        min: -0.3,
        max: 5.3,
        title: { display: true, text: 'エフォート' },
        ticks: {
          stepSize: 1,
          display: true,
          callback: (value: number) => {
            // 1,2,3,4,5のみ表示
            if (value >= 1 && value <= 5) return value.toString();
            return '';
          },
        },
        grid: { drawTicks: true },
      },
      y: {
        type: "linear" as const,
        min: -0.3,
        max: 6.3,
        title: { display: true, text: 'バリュー' },
        ticks: {
          stepSize: 1,
          display: true,
          callback: (value: number) => {
            // 1,2,3,4,5,6のみ表示
            if (value >= 1 && value <= 6) return value.toString();
            return '';
          },
        },
        grid: { drawTicks: true },
      },
    },
  }), [data]);

  return <Scatter data={chartData} options={options} />;
}
