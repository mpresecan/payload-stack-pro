import React, { JSX } from 'react';
import {render} from "@react-email/render";

interface EmailRendererProps {
    reactEmail: JSX.Element;
}

const EmailRenderer = async ({reactEmail} : EmailRendererProps) => {
    const html = await render(reactEmail, {
        pretty: true,
    });

    return (
        <div dangerouslySetInnerHTML={{__html: html}} />
    );
};

export default EmailRenderer;
