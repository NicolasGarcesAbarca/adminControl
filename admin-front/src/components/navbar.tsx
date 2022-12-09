import { Link } from "react-router-dom";
import { navItems } from '../ProjectConstants';
import { userContext } from "../hooks/user";
import { useContext } from "react";

export default function Navbar() {
    const user = useContext(userContext)
    if (user?.role === 'user') {
        return (
            <header className="nav" >
                <div className="nav__logo">
                    <p>LOGO</p>
                </div>
                <nav>
                    <ul className="nav__ul">
                        {navItems.map(x => (
                            <li key={x.path} className="nav__ul__li">
                                <Link className="nav__ul__li__link" to={x.path}>{x.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header >
        )
    } else {
        return (
            <header className="nav" >
                <div className="nav__logo">
                    <p>LOGO</p>
                </div>
                <nav>
                    <ul className="nav__ul">
                        <li className="nav__ul__li">
                            <Link className="nav__ul__li__link" to='/admin'>admin rol</Link>
                        </li>
                    </ul>
                </nav>
            </header >
        )
    }
}