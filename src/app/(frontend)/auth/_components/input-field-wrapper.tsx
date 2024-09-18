import React from 'react'

const InputFieldWrapper = ({children} : React.PropsWithChildren) => {
  return (
    <div className="grid gap-2">
      {children}
    </div>
  )
}

export default InputFieldWrapper
