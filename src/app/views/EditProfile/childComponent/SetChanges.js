import React from 'react'

export const SetChanges = React.memo(({increment}) => {
    console.log("me volvi a renderizar");
    return (
        <div>
            <button 
            type="button" 
            onClick={() => {
                increment();
            }}
            >
                Incrementar
            </button>
        </div>
    )
})
