import React from 'react';

interface BodyProps {
    children: React.ReactNode;
}

const Body = ({ children }: BodyProps) => {
    return (
        <body
            style={{
                backgroundColor: "rgb(255,255,255)",
                marginTop: "auto",
                marginBottom: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem"
            }}
        >
        {children}
        </body>
    );
};

export default Body;
