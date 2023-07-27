import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	user: {
		id: number;
		firstName: string | null;
		avatar: any;
		section: string;
	};
}

const initialState: UserState = {
	user: {
		id: 0,
		firstName: null,
		avatar: null,
		section: 'Search',
	},
};

const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		saveId: (currentSlice: UserState, action: PayloadAction<number>) => {
			return {
				...currentSlice,
				user: {
					...currentSlice.user,
					id: action.payload,
				},
			};
		},
		saveFirstName: (currentSlice: UserState, action: PayloadAction<string>) => {
			return {
				...currentSlice,
				user: {
					...currentSlice.user,
					firstName: action.payload,
				},
			};
		},
		saveAvatar: (currentSlice: UserState, action: PayloadAction<any>) => {
			return {
				...currentSlice,
				user: {
					...currentSlice.user,
					avatar: action.payload,
				},
			};
		},
		saveSection: (currentSlice: UserState, action: PayloadAction<any>) => {
			return {
				...currentSlice,
				user: {
					...currentSlice.user,
					section: action.payload,
				},
			};
		},
	},
});

const { saveId, saveFirstName, saveAvatar, saveSection } = userSlice.actions;

export { saveId, saveFirstName, saveAvatar, saveSection };
export default userSlice.reducer;