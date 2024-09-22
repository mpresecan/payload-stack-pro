import React from 'react';
// import {Text as ReactEmailText} from "@react-email/text"
// import {Tailwind} from "@react-email/tailwind";


interface TextProps {
    children: React.ReactNode;
    styles?: React.CSSProperties;
}

const Text = ({children, styles}: TextProps) => {
    return (
        <p
            style={{
                fontSize: "14px",
                lineHeight: "24px",
                margin: "16px 0",
                color: "rgb(0,0,0)",
                ...styles
        }}
        >
            {children}
        </p>
    );

    // return (
    //     <Tailwind>
    //         <ReactEmailText className="text-black text-[14px] leading-[24px]">
    //             {children}
    //         </ReactEmailText>
    //     </Tailwind>
    // );
};

export default Text;