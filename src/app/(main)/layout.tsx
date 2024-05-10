import { Navbar } from '@/components/Navbar'
import Navigate from '@/components/common/Navigate'
import { getServerAuthSession } from '@/server/auth'
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerAuthSession()

    if (!session) return <Navigate to='/signin' />
    return (
        <div className="container mx-auto">
            <Navbar />
            {children}
        </div>
    )
}

export default layout