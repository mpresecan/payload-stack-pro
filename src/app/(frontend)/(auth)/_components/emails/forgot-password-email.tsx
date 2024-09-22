import {siteConfig} from "@/config/app"
import {absoluteUrl} from "@/utilities/absoluteUrl"
import {ACCOUNT_PAGE, RESET_PASSWORD_PAGE} from "../../_config/routes";
import {Button, Link, Section, Text} from "@/components/email/components";
import {EmailTemplate, emailTemplateText} from "@/components/email/email-template";
import React, { JSX } from "react";

interface ResetPasswordEmailProps {
    resetPasswordToken: string
    userName?: string | null
}

export function ForgotPasswordEmail({
                                       userName,
                                       resetPasswordToken,
                                   }: Readonly<ResetPasswordEmailProps>): JSX.Element {
    const previewText = `${siteConfig.name} Password Reset Requested.`
    const resetPasswordUrl = absoluteUrl(`${RESET_PASSWORD_PAGE}?token=${resetPasswordToken}`);

    return (
        <EmailTemplate
            headingContent={<>Password Reset <strong>Requested</strong></>}
            previewText={previewText}
            greetingName={userName}
        >
            <>
                <Text>
                    <>
                        We received a request to reset the password for your <strong>{siteConfig.name}</strong> account.{" "}
                        If you made this request, please click on the link below to set up a new password:
                    </>
                </Text>
                <Section>
                    <Button href={resetPasswordUrl} label="Reset Your Password"/>
                </Section>
                <Text>
                    <>
                        or copy and paste this URL into your browser:{" "}
                        <Link href={resetPasswordUrl}>
                            {resetPasswordUrl}
                        </Link>
                    </>
                </Text>
                <Text>
                    This link will expire in 1 hour for your security. If you did not request to reset your password,{" "}
                    please ignore this email. Your current password will remain unchanged.
                </Text>
                <Text>
                    <em>For your security, please do not share this email or your unlock link with anyone</em>.
                </Text>
                <Text><strong>Didn&apos;t Request This?</strong></Text>
                <Text>
                    If you did not initiate this request, it&apos;s possible someone else is trying to access your account.{" "}
                    Please secure your account by changing your password and reviewing your security settings.{" "}
                    You can change your password <Link href={absoluteUrl(RESET_PASSWORD_PAGE)}>here</Link>.{" "}
                </Text>
                {/*<Text>*/}
                {/*    For additional security, consider enabling two-factor authentication (2FA) if you haven&apos;t already.{" "}*/}
                {/*    Review your security settings <Link href={absoluteUrl(ACCOUNT_PAGE)}>here</Link>.*/}
                {/*</Text>*/}
                <Text>
                    Thank you for taking steps to maintain the security of your account.
                </Text>
                <Text>
                    Best regards,<br/>
                    The {siteConfig.name} Security Team
                </Text>
            </>
        </EmailTemplate>
    )
}

export const resetPasswordEmailText = ({resetPasswordToken, userName}: Readonly<ResetPasswordEmailProps>) => {
    const resetPasswordUrl = absoluteUrl(`${RESET_PASSWORD_PAGE}?token=${resetPasswordToken}`);
    const generalText = emailTemplateText();

    return `
        Hi ${userName || "there"},\r\n\r\n
        We received a request to reset the password for your ${siteConfig.name} account. If you made this request,
        please click on the link below to set up a new password:\r\n\r\n
        ${resetPasswordUrl}\r\n\r\n
        This link will expire in 24 hours for your security. If you did not request to reset your password,
        please ignore this email. Your current password will remain unchanged.\r\n\r\n
        For your security, please do not share this email or your unlock link with anyone.\r\n\r\n
        Didn't Request This?\r\n\r\n
        If you did not initiate this request, it's possible someone else is trying to access your account.
        Please secure your account by changing your password and reviewing your security settings.
        You can change your password here: ${absoluteUrl(RESET_PASSWORD_PAGE)}\r\n\r\n
        For additional security, consider enabling two-factor authentication (2FA) if you haven't already.
        Review your security settings here: ${absoluteUrl(ACCOUNT_PAGE)}\r\n\r\n
        Thank you for taking steps to maintain the security of your account.\r\n\r\n
        Best regards,\r\n
        The ${siteConfig.name} Security Team\r\n\r\n
        ${generalText}
    `;
}
