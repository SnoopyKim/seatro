import React, { createContext, useState } from 'react'

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [station, setStation] = useState(null);
    const contextValue = { station, setStation };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };


