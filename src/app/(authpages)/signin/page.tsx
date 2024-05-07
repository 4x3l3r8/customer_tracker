import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type NextPage } from 'next'
import { getProviders } from "next-auth/react"
import { AuthForm } from './AuthForm'
import { getServerAuthSession } from '@/server/auth'
import Navigate from '@/components/common/Navigate'

const SignInPage: NextPage = async () => {
    const providers = await getProviders()
    const session = await getServerAuthSession()

    if (session) {
        return <Navigate to='/dashboard' />
    }

    return (
        <Card className="w-1/4">
            <CardHeader>
                <CardTitle className="text-2xl text-center">CusTrak</CardTitle>
                <CardDescription className='text-center'>
                    Enter your email below to continue
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AuthForm providers={providers} />
            </CardContent>
        </Card>
    )
}

export default SignInPage