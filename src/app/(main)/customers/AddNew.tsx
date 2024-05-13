
import { CustomersForm } from "@/components/CustomersForm"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"

export function AddNewCustomer() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-fit ml-auto">
                    <span className="hidden md:block">Add New Customer</span>
                    <span className="block md:hidden"><PlusIcon /></span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogDescription>
                        Fill in the details of your customer
                    </DialogDescription>
                </DialogHeader>
                <CustomersForm />
            </DialogContent>
        </Dialog>
    )
}
