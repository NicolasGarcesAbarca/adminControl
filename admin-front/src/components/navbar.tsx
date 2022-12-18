import { Link } from "react-router-dom";
import { userContext } from "../hooks/user";
import { useContext } from "react";

function UlbyRole({ role }: { role: string }) {
    let items = [
        { name: 'Home', path: '/' },
        { name: 'LogIn', path: '/login' }]

    if (role) {
        if (role === 'admin') {
            items = [...items, { name: 'list', path: '/admin/user' },{ name: 'create', path: '/admin/createuser' }]
        } else if (role === 'user') {
            items = [...items, { name: 'user', path: '/admin/' }]
        }
    }

    return <ul className="nav__ul">
        {items.map(x => (
            <li key={x.path} className="nav__ul__li">
                <Link className="nav__ul__li__link" to={x.path}>{x.name}</Link>
            </li>
        ))}
    </ul>
}

export default function Navbar() {
    const { user } = useContext(userContext)
    const role = user ? (user.role? user.role:'') : ''
    return (
        <header className="nav" >
            <div className="nav__logo">
                <p>LOGO</p>
                {role ? <p>{role}</p>:<p>no user</p>}
            </div>
            <nav>
                <UlbyRole role={role} />
            </nav>
        </header >
    )
}