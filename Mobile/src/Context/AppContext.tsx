import React, { createContext, FC, useContext, Dispatch } from 'react';
import { AuthState, AuthAction } from 'Reducers/AuthReducer';
import useAuth from 'Hooks/useAuth';

/* Interface for the app context */
interface AppContextState {
	user: [AuthState, Dispatch<AuthAction>];
}

/* Default app context state */
const DEFAULT_APP_STATE: AppContextState = {
	user: [null, () => {}],
};

/* Creating the context */
export const AppContext = createContext<AppContextState>(DEFAULT_APP_STATE);

/* The context provider */
const AppContextProvider: FC = ({ children }) => {
	/* Check for user authentication */
	const { loading, user, dispatchUser } = useAuth();

	return (
		<AppContext.Provider
			value={{
				user: [user, dispatchUser],
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;

/* Obtains the current user from the context */
export const useUser = (): [AuthState, Dispatch<AuthAction>] => {
	return useContext(AppContext).user;
};
