
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

export function AddNewCustomer() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto">Add New Customer</Button>
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
