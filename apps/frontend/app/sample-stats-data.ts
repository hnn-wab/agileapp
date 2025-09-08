// サンプルデータ（本来はAPIやpropsで受け取る想定）
export const dailyOpenCounts = [
  { date: '2025-09-01', open: 10 },
  { date: '2025-09-02', open: 8 },
  { date: '2025-09-03', open: 6 },
  { date: '2025-09-04', open: 4 },
  { date: '2025-09-05', open: 0 },
];

export const actualLine = [
  { date: '2025-09-01', value: 10 },
  { date: '2025-09-02', value: 8 },
  { date: '2025-09-03', value: 6 },
  { date: '2025-09-04', value: 4 },
  { date: '2025-09-05', value: 0 },
];

export const issueStateCount = { open: 3, closed: 2 };

export const storyPointStats = {
  total: 20,
  remaining: 5,
  completed: 15,
};

export const leadTimeStats = {
  average: 2.5,
  min: 1,
  max: 5,
};

export const velocityStats = {
  average: 4,
  recent: 5,
};

export const dailyProgress = [
  { date: '2025-09-01', completed: 2, remaining: 8 },
  { date: '2025-09-02', completed: 2, remaining: 6 },
  { date: '2025-09-03', completed: 2, remaining: 4 },
  { date: '2025-09-04', completed: 2, remaining: 2 },
  { date: '2025-09-05', completed: 2, remaining: 0 },
];

export const groupedIssues = [
  { group: 'bug', count: 2 },
  { group: 'feature', count: 3 },
];

export const filteredIssues = [
  { id: 1, title: 'Issue 1', state: 'open' },
  { id: 2, title: 'Issue 2', state: 'closed' },
];