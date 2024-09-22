import React from 'react';
// import {Text as ReactEmailText} from "@react-email/text"
// import {Tailwind} from "@react-email/tailwind";


interface SmallTextProps {
    children: React.ReactNode;
    align?: "left" | "center" | "right";
    italic?: boolean;
}

const SmallText = ({children, align = 'left', italic = false}: SmallTextProps) => {
    return (
        <p
            style={{
                fontSize: "12px",
                lineHeight: "20px",
                margin: "11px 0",
                color: "rgb(102,102,102)",
                textAlign: align,
                fontStyle: italic ? "italic" : "normal"
        }}
        >
            {children}
        </p>
    );

    // return (
    //     <Tailwind>
    //         <ReactEmailText className="text-[#666666] text-[12px] leading-[24px] text-center">
    //             {children}
    //         </ReactEmailText>
    //     </Tailwind>
    // );
};

export default SmallText;