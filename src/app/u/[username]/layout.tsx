import React from 'react'

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <div className='h-screen bg-white'>{children}</div>
  )
}

export default layout