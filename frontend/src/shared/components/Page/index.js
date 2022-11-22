import React from 'react'

export const Page = (props) => {

    return (
        <div style={{ flex: 1, overflow: 'hidden' }}>{props.children}</div>
    )
}