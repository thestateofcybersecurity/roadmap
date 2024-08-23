export interface Task {
  id: string;
  name: string;
  start: Date;
  end: Date;
  status: 'New' | 'In Progress' | 'Completed';
}

export interface Framework {
  id: string;
  name: string;
  tasks: Task[];
}

export interface VCISOTask {
  Task: string;
  Description: string;
  Status: string;
  'Timeline - Start': string;
  'Timeline - End': string;
  'Estimated vCISO HR(s)': number;
  Package: 'Lean' | 'Standard' | 'Premium';
  Quarter: string;
}

export interface RoadmapState {
  frameworks: Framework[];
  selectedFramework: string | null;
  vcisoTasks: VCISOTask[];
}
