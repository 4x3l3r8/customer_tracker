import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { api } from '@/trpc/server';
import Link from 'next/link';

const Dashboard = async () => {
    const latestCustomers = await api.customer.getLatest()
    return (
        <div className='py-10'>
            <h3 className='mb-4 font-semibold text-4xl'>Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Customers</CardTitle>
                        <CardDescription>Manage your customer data.</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col'>
                        {latestCustomers.length >= 1 ? latestCustomers.map((cus) => {
                            return <div key={cus.id} className='flex flex-col gap-3'><div key={cus.id} className='mt-1'>{cus.name} - {cus.email}</div><Separator /></div>
                        }) : <>No customer has been created!</>}
                    </CardContent>
                    <CardFooter className='mt-auto'>
                        <Button variant="link" asChild><Link href={"/customers"}>View all Customers</Link></Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Calendar</CardTitle>
                        <CardDescription>View and schedule events.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Calendar />
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline">Create Event</Button>
                    </CardFooter>
                </Card>

                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Card>
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>Stay up-to-date.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-center">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline">View Notifications</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Notifications</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Here are your latest notifications.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardContent>
                        </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="grid gap-4">
                            <Input placeholder="Search notifications..." />
                            <Separator />
                            <p>No notifications found.</p>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
        </div>
    );
}

export default Dashboard;