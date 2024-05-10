import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const Page = () => {
    return (
        <Card className="w-1/4">
            <CardHeader>
                <CardTitle className="text-2xl text-center">CusTrak</CardTitle>
                <CardDescription className='text-center'>
                    Please check your mail
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className='text-center text-2xl'> A link has been sent to your mail. Please click it to continue.</h3>
            </CardContent>
        </Card>
    )
}

export default Page