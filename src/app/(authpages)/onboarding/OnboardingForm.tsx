"use client"

import { Spinner } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/trpc/react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { toast } from "sonner"

const formSchema = z.object({
    name: z.string().min(2).max(50),
})

export const OnboardingForm = () => {
    const router = useRouter()


    const createUser = api.user.create.useMutation({
        onSuccess: () => {
            router.push("/dashboard")
            toast.success("Your account has been created!", {
                description: "You'll be redirected soon!"
            })
        }
    })

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        createUser.mutate(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fullname</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex flex-col gap-2'>
                    <Button type='submit' disabled={createUser.isPending}>
                        {createUser.isPending ? <Spinner size='sm' /> : "Save & Continue"}
                    </Button>
                </div>
            </form>
        </Form >
    )
}
