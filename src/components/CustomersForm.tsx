"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from "@/trpc/react"
import { toast } from "sonner"
import { DialogClose, DialogFooter } from "./ui/dialog"
import { Spinner } from "./common"

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    email: z.string().email(),
    phone: z.string().max(11, "Too long!").min(11, "Too short!"),
    address: z.string().min(3, "Address is too short!")
})

export const CustomersForm = () => {
    const addCustomer = api.customer.create.useMutation({
        onSuccess: () => {
            toast.success("Your new customer has been created")
        },
        onError: () => {
            toast.error("Failed to create customer!")
        }
    })



    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            address: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        addCustomer.mutate({ ...data, phone: data.phone.toString() })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Customer&apos;s Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Customer&apos;s Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@mail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Customer&apos;s Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="+2348032435643" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Customer&apos;s Address</FormLabel>
                            <FormControl>
                                <Input placeholder="1, Business district" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter className="sm:justify-start md:justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>

                    <Button type="submit" disabled={addCustomer.isPending}>{addCustomer.isPending ? <Spinner size="sm" /> : "Save"}</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
