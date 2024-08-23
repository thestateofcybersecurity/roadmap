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

export interface RoadmapState {
  frameworks: Framework[];
  selectedFramework: string | null;
}
