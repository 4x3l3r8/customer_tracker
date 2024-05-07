import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { OnboardingForm } from './OnboardingForm'
import { getServerAuthSession } from '@/server/auth'
import Navigate from '@/components/common/Navigate'

const OnboardingPage = async () => {
    const session = await getServerAuthSession()

    if (!session) {
        return <Navigate to='/signin' />
    } else {
        if (session.user.name) {
            return <Navigate to='/dashboard' />
        }
    }

    return (
        <Card className="w-1/4">
            <CardHeader>
                <CardTitle className="text-2xl text-center">CusTrak</CardTitle>
                <CardDescription className='text-center'>
                    Enter your details below to continue
                </CardDescription>
            </CardHeader>
            <CardContent>
                <OnboardingForm />
            </CardContent>
        </Card>
    )
}

export default OnboardingPage