import React from "react"

const Authlayout = ({ children }: { children: React.ReactNode }) => {
    return <div className='h-screen w-screen flex justify-center items-center bg-secondary'>{children}</div>
}

export default Authlayout