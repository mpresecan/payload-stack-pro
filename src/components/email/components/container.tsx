import React from 'react';

interface ContainerProps {
    children?: React.ReactNode; // Changed to React.ReactNode
}

const Container = ({children}: ContainerProps) => {
    return (
        <table
            align="center"
            width="100%"
            border={0}
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            style={{
                maxWidth: "465px",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgb(234,234,234)",
                borderRadius: "0.25rem",
                marginTop: "40px",
                marginBottom: "40px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "20px"
            }}>
            <tbody>
                <tr style={{width:"100%"}}>
                    <td>{children}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default Container;
