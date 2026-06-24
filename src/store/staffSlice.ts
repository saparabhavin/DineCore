import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StaffMember {
  id: string;
  name: string;
  role: 'Manager' | 'Waiter' | 'Kitchen';
  isActive: boolean;
}

interface StaffState {
  staffList: StaffMember[];
  loading: boolean;
}

const initialState: StaffState = {
  staffList: [],
  loading: false,
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setStaff: (state, action: PayloadAction<StaffMember[]>) => {
      state.staffList = action.payload;
    },
    toggleStaffStatus: (state, action: PayloadAction<string>) => {
      const member = state.staffList.find(s => s.id === action.payload);
      if (member) {
        member.isActive = !member.isActive;
      }
    },
  },
});

export const { setStaff, toggleStaffStatus } = staffSlice.actions;
export default staffSlice.reducer;
