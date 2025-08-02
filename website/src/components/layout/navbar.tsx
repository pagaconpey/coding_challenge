
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
                <a className="btn btn-ghost sm:text-2xl">{brand}</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 sm:text-lg">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.href}>{item.label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}