import { CISControl } from '../types';

export const loadFrameworkData = async (framework: string): Promise<any[]> => {
  switch (framework) {
    case 'CIS':
      const cisData = await import('../data/cis_framework.json');
      return cisData.default;
    // Add cases for other frameworks
    default:
      return [];
  }
};

export const getFrameworkFilters = (framework: string) => {
  switch (framework) {
    case 'CIS':
      return {
        riskLevels: ['Critical', 'High', 'Medium', 'Low'],
        implementationGroups: ['IG1', 'IG2', 'IG3']
      };
    // Add cases for other frameworks
    default:
      return { riskLevels: [], implementationGroups: [] };
  }
};

export const filterFrameworkData = (data: CISControl[], filters: { riskLevels: string[], implementationGroups: string[] }) => {
  return data.filter(item => 
    filters.riskLevels.includes(item.RISK) &&
    filters.implementationGroups.some(ig => item[ig as keyof CISControl] !== NaN && item[ig as keyof CISControl] !== '')
  );
};
