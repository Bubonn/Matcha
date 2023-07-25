import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	user: {
		id: number;
		// firstName: string;
		// token: string;
		// avatar: string;
	};
}

const initialState: UserState = {
	user: {
		id: 0,
		// firstName: '',
		// token: '',
		// avatar: '',
	},
};

const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		saveInfoUser: (currentSlice: any, action: PayloadAction<{
			id: number;
			// firstName: string;
			// userStatus: string;
			// avatar: string;
		}>) => {
			currentSlice.user.id = action.payload.id;
			// currentSlice.user.firstName = action.payload.firstName;
			// currentSlice.user.status = action.payload.userStatus;
			// currentSlice.user.avatar = action.payload.avatar;
		},
		// setToken: (currentSlice: any, action: PayloadAction<string>) => {
		// 	currentSlice.user.token = action.payload;
		// },
		// setAvatar: (currentSlice: any, action: PayloadAction<string>) => {
		// 	currentSlice.user.avatar = action.payload;
		// },
	},
});

const { saveInfoUser } = userSlice.actions;
// const { saveInfoUser, setAvatar, setToken } = userSlice.actions;

// export { saveInfoUser, setAvatar, setToken };
export { saveInfoUser };
export default userSlice.reducer;