import { User } from '@/payload-types'

export type FormCTAActionType = {
  label: string;
  redirect: string;
};

type SuccessResultType = {
  success: string;
  description?: string;
  user?: User
};

type ErrorResultType = {
  error: string;
  description?: string;
  action?: FormCTAActionType;
};

type SpecialPayloadType = {
  specialAction: string;
}

export type ActionResultType = SuccessResultType | ErrorResultType | SpecialPayloadType;
