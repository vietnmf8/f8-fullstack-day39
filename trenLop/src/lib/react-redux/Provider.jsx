/* eslint-disable react/prop-types */
import Context from "./Context"
import React from 'react'

const Provider = ({children, store}) => {
    return <Context.Provider value={store}>
        {children}
    </Context.Provider>
}

export default Provider