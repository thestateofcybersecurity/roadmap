export interface Task {
  id: string;
  name: string;
  start: Date;
  end: Date;
  status: string;
}
export interface Framework {
  id: string;
  name: string;
  tasks: Task[];
}

export interface VCISOTask {
  Task: string;
  Description: string;
  'Estimated vCISO HR(s)': number;
  Package: 'Lean' | 'Standard' | 'Premium';
  Quarter: string;
  Status?: string;
  'Timeline - Start'?: string;
  'Timeline - End'?: string;
}

export interface RoadmapState {
  frameworks: Framework[];
  selectedFramework: string | null;
  vcisoTasks: VCISOTask[];
}

export interface CISControl {
  'CIS Control': string;
  'CIS Sub-Control': number;
  'Asset Type': string;
  'Security Function': string;
  'Title': string;
  'CIS Safeguard Description': string;
  'IG1': string | number;
  'IG2': string | number;
  'IG3': string | number;
  'RISK': string;
  'ETR': string;
}
