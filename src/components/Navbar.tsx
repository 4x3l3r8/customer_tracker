import { getServerAuthSession } from '@/server/auth'
import { CircleUser, Menu, Users2Icon } from "lucide-react"
import { headers } from 'next/headers'
import Link from 'next/link'
import { SignoutButton } from './SignoutButton'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import logo from "@/assets/logo.png" 
import Image from 'next/image'

const navLinks = [{
    label: 'Dashboard',
    href: '/dashboard',
}, {
    label: 'Customers',
    href: '/customers',
}]

export const Navbar = async () => {
    const session = await getServerAuthSession()
    const headersList = headers();
    const pathname = (headersList.get("x-pathname"))

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background justify-between px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Image alt='logo' src={logo} className="h-10 w-10" />
                    <span className="sr-only">CusTrak</span>
                </Link>
                {navLinks.map((link, i) => <Link key={i} className={`transition-colors hover:text-foreground ${pathname === link.href ? "text-primary" : "text-muted-foreground"}`} href={link.href}>{link.label}</Link>)}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Image alt='logo' src={logo} className="h-10 w-10" />
                            <span className="">CusTrak</span>
                        </Link>
                        {navLinks.map((link, i) => <Link key={i} className={`hover:text-foreground ${pathname === link.href ? "text-primary" : "text-muted-foreground"}`} href={link.href}>{link.label}</Link>)}
                    </nav>
                </SheetContent>
            </Sheet>
            {session && (
                <div className="flex w-auto items-center gap-4 md:gap-2 lg:gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="default" className="rounded-full ml-auto">
                                {session.user.name}
                                <CircleUser className="h-5 w-5 ml-1" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><SignoutButton /></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>)}
        </header>
    )
}
