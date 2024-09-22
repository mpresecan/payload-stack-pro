import React from 'react';
import { Metadata } from "next";
import AuthCardWrapper from "../_components/auth-card-wrapper";
import { SuccessCallToAction, ErrorCallToAction } from '../_components/verify-email/call-to-actions';
import VerifyEmailCard from '@/app/(frontend)/auth/_components/verify-email/verify-email-card'

export const dynamic = 'force-dynamic'

const domain = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: "Email Verification",
  description: "Verify your email address to continue",
}

export interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  const token = searchParams?.token;

  if (!token) {
    return (
      <AuthCardWrapper
        title="Missing Email Verification Token"
        subtitle="Please return to the sign up page and try again"
      >
        <ErrorCallToAction />
      </AuthCardWrapper>
    );
  }

  return (<VerifyEmailCard token={token} />)
};

export default VerifyEmailPage;
