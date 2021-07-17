import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = () => {

    const [session, setSession] = useState({
        token: null,
        userid: null
      });

      return (
        <AppContext.Provider
          value={{
            session
          }}
        >
        </AppContext.Provider>
      );

}

export default AppProvider;