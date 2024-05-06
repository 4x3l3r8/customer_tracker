"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { type BuiltInProviderType } from 'next-auth/providers/index'
import { signIn, type ClientSafeProvider, type LiteralUnion } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from "zod"

const formSchema = z.object({
    email: z.string().email("Email is invalid").min(2).max(50),
})

export const AuthForm = ({ providers }: { providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null }) => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        await signIn("email", values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="user@mail.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                The email you have access to.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex flex-col gap-2'>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <Button
                                key={provider.name}
                                // className="rounded-"
                                type={provider.name === "Email" ? "submit" : "button"}
                                onClick={async () => {
                                    if (provider.name !== "Email") { await signIn(provider.id) }
                                }}
                            >
                                Continue with {provider.name}
                            </Button>
                        ))}
                </div>
            </form>
        </Form >
    )
}
