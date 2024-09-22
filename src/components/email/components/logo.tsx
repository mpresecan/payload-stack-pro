import React from 'react';
import {siteConfig} from "@/config/app";

interface LogoProps {
    logoUrl?: string
    logoAlt?: string
    width?: string
    height?: string
}

const Logo = ({
                  logoUrl = siteConfig.logo.png,
                  logoAlt = `${siteConfig.name} logo`,
                  width = "71",
                  height = "36",
              }: LogoProps) => {

    return (
        <>
            <link rel="preload" as="image" href={logoUrl} />
            <table
                align="center"
                width="100%"
                border={0}
                cellPadding="0"
                cellSpacing="0"
                role="presentation"
                style={{marginTop: "32px"}}
            >
                <tbody>
                <tr>
                    <td>
                        <img
                            alt={logoAlt}
                            height={height}
                            width={width}
                            src={logoUrl}
                            style={{
                                display: "block",
                                outline: "none",
                                border: "none",
                                textDecoration: "none",
                                marginTop: "0px",
                                marginBottom: "0px",
                                marginLeft: "auto",
                                marginRight: "auto"
                        }}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    );
};

export default Logo;
