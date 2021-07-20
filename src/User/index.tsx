import React, { useEffect, useState } from 'react'
import { User } from '..'

interface UserProps {
  user: User
}

export const UserComponent: React.FC<UserProps> = ({ user }: UserProps) => {
  return (
    <tr>
      <td data-label="Name">{user.name}</td>
      <td data-label="Age">{user.age}</td>
      <td data-label="State">{user.state}</td>
    </tr>
  )
}
