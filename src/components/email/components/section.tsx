import React from 'react';
import {inspect} from "util";
// import {Section as ReactEmailSection} from "@react-email/section"
// import {Tailwind} from "@react-email/tailwind";

interface SectionProps {
    children: React.ReactNode;
    styles?: React.CSSProperties;
}

const Section = ({children, styles}: SectionProps) => {
    return (
        <table
            align="center"
            width="100%"
            border={0}
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            style={{
                textAlign: "center",
                marginTop: "32px",
                marginBottom: "32px",
                ...styles
            }}
        >
            <tbody>
                <tr>
                    <td>
                        {children}
                    </td>
                </tr>
            </tbody>
        </table>
    );

    // return (
    //     <Tailwind>
    //         <ReactEmailSection className="text-center mt-[32px] mb-[32px]">
    //             {children}
    //         </ReactEmailSection>
    //     </Tailwind>
    // );
};

export default Section;