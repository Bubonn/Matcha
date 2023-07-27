import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	user: {
		id: number;
		firstName: string | null;
		// token: string;
		avatar: any;
	};
}

const initialState: UserState = {
	user: {
		id: 0,
		firstName: null,
		// token: '',
		avatar: null,
	},
};

const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		// saveInfoUser: (currentSlice: any, action: PayloadAction<{
		// 	id: number;
		// 	// firstName: string;
		// 	// userStatus: string;
		// 	// avatar: string;
		// }>) => {
		// saveInfoUser: (currentSlice: any, action: PayloadAction<number>) => {
			// console.log('action', action.payload);
			// currentSlice.user.id = action.payload;
			// currentSlice.user.firstName = action.payload.firstName;
			// currentSlice.user.status = action.payload.userStatus;
			// currentSlice.user.avatar = action.payload.avatar;
		// },
		// setToken: (currentSlice: any, action: PayloadAction<string>) => {
		// 	currentSlice.user.token = action.payload;
		// },
		// setAvatar: (currentSlice: any, action: PayloadAction<string>) => {
		// 	currentSlice.user.avatar = action.payload;
		// },

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
	},
});

const { saveId, saveFirstName, saveAvatar } = userSlice.actions;
// const { saveInfoUser, setAvatar, setToken } = userSlice.actions;

// export { saveInfoUser, setAvatar, setToken };
export { saveId, saveFirstName, saveAvatar };
export default userSlice.reducer;