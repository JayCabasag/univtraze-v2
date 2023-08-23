import React, { createContext, useContext, useReducer } from 'react';

// Define the userReducer function first
function userReducer(user, action) {
  switch (action.type) {
    case 'update': {
      return action.payload;
    }
    case 'reset': {
      return user;
    }
    case 'update-type': {
      return {
        ...user,
        type: action.payload
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

// Define the initial user state
const initialUser = {
  id: null,
  type: null,
  email: null,
  token: null,
  verified: false,
  status: 'authenticating',
};

// Create the context and provider components
const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

export function UserProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, initialUser);
  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}