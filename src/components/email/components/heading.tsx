import React from 'react';

interface HeadingProps {
    children: React.ReactNode;
}

const Heading = ({children} : HeadingProps) => {
    return (
        <h1
            style={{
                color: "rgb(0,0,0)",
                fontSize: "24px",
                fontWeight: 400,
                textAlign: "center",
                padding: 0,
                marginTop: "30px",
                marginBottom: "30px",
                marginLeft: 0,
                marginRight: 0

            }}
        >
            {children}
        </h1>
    );
};

export default Heading;