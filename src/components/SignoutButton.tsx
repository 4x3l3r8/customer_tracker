"use client"

import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

export const SignoutButton = () => {
    return (
        <Button className='text-destructive' variant={"link"} onClick={() => signOut()}>Signout</Button>
    )
}
