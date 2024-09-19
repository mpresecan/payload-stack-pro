'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/utilities/cn'
import { Label } from '@/components/ui/label'
import * as React from 'react'
import { RESET_PASSWORD_PAGE } from '@/app/(frontend)/auth/_config/routes'
import Link from 'next/link'
import InputFieldWrapper from '@/app/(frontend)/auth/_components/input-field-wrapper'

interface PasswordFieldProps {
  showStrengthIndicator?: boolean
  name?: string
  confirmPassword?: boolean
  showForgotPasswordLink?: boolean
  setPasswordReady?: (ready: boolean) => void
}

const requirements = [
  { re: /.{8,}/, label: 'At least 8 characters long' },
  { re: /[a-z]/, label: 'Contains lowercase letters' },
  { re: /[A-Z]/, label: 'Contains uppercase letters' },
  { re: /[0-9]/, label: 'Contains numbers' },
  { re: /[^a-zA-Z0-9]/, label: 'Contains special characters' },
]

export function PasswordField({
                                showStrengthIndicator = true,
                                name = 'password',
                                confirmPassword = false,
                                setPasswordReady,
                                showForgotPasswordLink = false
                              }: PasswordFieldProps) {
  const [password, setPassword] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [passwordIdentical, setPasswordIdentical] = useState(false)
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    const newStrength = requirements.filter(req => req.re.test(password)).length
    setStrength((newStrength / requirements.length) * 100)
  }, [password])

  useEffect(() => {
    if (setPasswordReady) {
      setPasswordReady(strength >= 100 && passwordIdentical)
    }
  }, [strength, passwordIdentical, setPasswordReady])

  const toggleShowPassword = () => setShowPassword(!showPassword)
  const toggleShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm)

  return (
    <React.Fragment>
      <InputFieldWrapper>
        <div className='flex items-center'>
          <Label htmlFor={name}>{confirmPassword ? 'New Password' : 'Password'}</Label>
          {showForgotPasswordLink && <Link
            href={RESET_PASSWORD_PAGE}
            className="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </Link>}
        </div>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            name={name}
            onChange={(e) => {
              setPassword(e.target.value)
              setPasswordIdentical(e.target.value === confirmPasswordValue && confirmPasswordValue.length > 0)
            }}
            placeholder={confirmPassword ? 'Enter your new password' : 'Enter your password'}
            className="pr-10"
          />
          <ShowPasswordButton showPassword={showPassword} toggleShowPassword={toggleShowPassword} />
        </div>
      </InputFieldWrapper>
      {
        confirmPassword && (
          <InputFieldWrapper>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                type={showPasswordConfirm ? 'text' : 'password'}
                value={confirmPasswordValue}
                name="confirmPassword"
                onChange={(e) => {
                  setPasswordIdentical(e.target.value === password && password.length > 0)
                  setConfirmPasswordValue(e.target.value)
                }}
                placeholder="Confirm your new password"
                className="pr-10"
              />
              <ShowPasswordButton showPassword={showPasswordConfirm} toggleShowPassword={toggleShowPasswordConfirm} />
            </div>
          </InputFieldWrapper>
        )
      }
      {
        showStrengthIndicator && (
          <div className="border flex flex-col p-4 gap-4">
            <Progress value={strength} className={cn('w-full h-2')} />

            <ul className="space-y-2">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-center space-x-2">
                  {req.re.test(password) ? (
                    <Check className="text-success h-3 w-3" />
                  ) : (
                    <X className="text-muted-foreground h-3 w-3" />
                  )}
                  <span className={cn('text-sm', req.re.test(password) ? 'text-success' : 'text-muted-foreground')}>
                      {req.label}
                    </span>
                </li>
              ))}
              {confirmPassword && (
                <li className="flex items-center space-x-2">
                  {passwordIdentical ? (
                    <Check className="text-success h-3 w-3" />
                  ) : (
                    <X className="text-muted-foreground h-3 w-3" />
                  )}
                  <span className={cn('text-sm', passwordIdentical ? 'text-success' : 'text-muted-foreground')}>
                      Passwords are identical
                    </span>
                </li>
              )}
            </ul>
          </div>
        )
      }
    </React.Fragment>
  )
}


const ShowPasswordButton = ({ showPassword, toggleShowPassword }) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className="absolute right-0 top-0 h-full"
    onClick={toggleShowPassword}
  >
    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    <span className="sr-only">
      {showPassword ? 'Hide password' : 'Show password'}
    </span>
  </Button>
)
