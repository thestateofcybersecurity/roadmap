import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoadmapState, Framework, Task } from '../../../src/types';

const initialState: RoadmapState = {
  frameworks: [],
  selectedFramework: null,
};

const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    setFrameworks: (state, action: PayloadAction<Framework[]>) => {
      state.frameworks = action.payload;
    },
    selectFramework: (state, action: PayloadAction<string>) => {
      state.selectedFramework = action.payload;
    },
    updateTask: (state, action: PayloadAction<{ frameworkId: string; task: Task }>) => {
      const { frameworkId, task } = action.payload;
      const framework = state.frameworks.find(f => f.id === frameworkId);
      if (framework) {
        const taskIndex = framework.tasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          framework.tasks[taskIndex] = task;
        }
      }
    },
  },
});

export const { setFrameworks, selectFramework, updateTask } = roadmapSlice.actions;
export default roadmapSlice.reducer;
