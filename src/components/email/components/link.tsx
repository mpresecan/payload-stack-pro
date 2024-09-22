import React from 'react';
// import {Link as ReactEmailLink} from "@react-email/link";
// import {Tailwind} from "@react-email/tailwind";

interface LinkProps {
    children: React.ReactNode;
    href: string;
}

const Link = ({children, href}: LinkProps) => {
    return (
        <a
            href={href}
            style={{
                color: "rgb(37,99,235)",
                textDecoration: "none",
                textDecorationLine: "none"

            }}
            target="_blank"
        >
            {children}
        </a>
    );

    // return (
    //     <Tailwind>
    //         <ReactEmailLink href={href} className="text-blue-600 no-underline">
    //             {children}
    //         </ReactEmailLink>
    //     </Tailwind>
    // );
};

export default Link;