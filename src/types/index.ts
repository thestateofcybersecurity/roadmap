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
  Package: 'Small' | 'Medium' | 'Large';
  Quarter: string;
  Status?: string;
  'Timeline - Start'?: string;
  'Timeline - End'?: string;
}

export interface RoadmapState {
  frameworks: string[];
  selectedFramework: string | null;
  frameworkData: CISControl[]; // Add this line
  vcisoTasks: VCISOTask[];
  filters: {
    riskLevels: string[];
    implementationGroups: string[];
  };
}

export interface CISControl {
  'CIS Control': string;
  'CIS Sub-Control': number;
  'Asset Type': string;
  'Security Function': string;
  'Title': string;
  'CIS Safeguard Description': string;
  'IG1': string | number | null;
  'IG2': string | number | null;
  'IG3': string | number | null;
  'RISK': string;
  'ETR': string;
}
