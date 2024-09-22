import React from 'react';
// import {Button as ReactEmailButton} from "@react-email/button"
// import {Tailwind} from "@react-email/tailwind";

interface ButtonProps {
    label: string;
    href: string;
}

const Button = ({label, href}: ButtonProps) => {
    const htmlContent = `<span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">${label}</span><span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span>`;

    return (
        <a
            href={href}
            style={{
                backgroundColor: "rgb(0,0,0)",
                borderRadius: "0.25rem",
                color: "rgb(255,255,255)",
                fontSize: "12px",
                fontWeight: 600,
                textDecorationLine: "none",
                textAlign: "center",
                paddingLeft: "1.25rem",
                paddingRight: "1.25rem",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                lineHeight: "100%",
                textDecoration: "none",
                display: "inline-block",
                maxWidth: "100%",
                padding: "12px 20px 12px 20px"
            }}
            target={"_blank"}
        >
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </a>
    );

    // return (
    //     <Tailwind>
    //         <ReactEmailButton
    //             className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
    //             href={href}
    //         >
    //             {label}
    //         </ReactEmailButton>
    //     </Tailwind>
    // );
};

export default Button;