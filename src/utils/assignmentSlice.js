import { createSlice } from "@reduxjs/toolkit";

const assignmentSlice = createSlice({
    name: "assignment",
    initialState: null,
    reducers: {
        addAssignments: (state, action) => {
            return action.payload;
        }
    }
});

export const { addAssignments } = assignmentSlice.actions;
export default assignmentSlice.reducer;