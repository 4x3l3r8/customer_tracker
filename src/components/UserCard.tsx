import { getServerAuthSession } from '@/server/auth'
import { SignoutButton } from './SignoutButton'

export const UserCard = async () => {
  const session = await getServerAuthSession()
  if (session)
    return (
      <div>Welcome {session.user.name}! <SignoutButton /></div>
    )
}
