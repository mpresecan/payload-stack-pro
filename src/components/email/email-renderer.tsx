import React, { JSX } from 'react';
import {render} from "@react-email/render";

interface EmailRendererProps {
    reactEmail: JSX.Element;
}

const EmailRenderer = ({reactEmail} : EmailRendererProps) => {
    const html = render(reactEmail, {
        pretty: true,
    });

    return (
        <div dangerouslySetInnerHTML={{__html: html}} />
    );
};

export default EmailRenderer;
