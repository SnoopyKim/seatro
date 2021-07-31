import React, { createContext, useEffect, useState } from 'react'

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [ station, setStation ] = useState(null);
    const [ switchStatus, setSwitchStatus ] = useState(false);
    const contextValue = { station, setStation, switchStatus, setSwitchStatus};

    useEffect(() => {
        switchStatus && setTimeout(() => {
        // TODO: 페이지 변경 확인 (데이터 받아와졌는지 확인)
        //
        setSwitchStatus(false)
        }, 1000)
    }, [switchStatus])

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };


