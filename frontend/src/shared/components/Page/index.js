import React from 'react'

export const Page = (props) => {

    return (
        <div style={{ flex: 1, marginTop: '55px', overflow: 'hidden' }}>{props.children}</div>
    )
}