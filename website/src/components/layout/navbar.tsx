'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavItem {
    label: string;
    href: string;
}

// Number of items is determined by the array length
interface NavbarProps {
    brand: string;
    navItems: NavItem[]; 
}


export default function Navbar({ brand, navItems }: NavbarProps) {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link className="btn btn-ghost sm:text-2xl" href="/">{brand}</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 sm:text-lg">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}