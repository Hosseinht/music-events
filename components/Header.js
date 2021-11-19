import Link from "next/link";
import Search from "@/components/Search";
import styles from '@/styles/Header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href={'/'}>
                    <a>Music Events</a>
                </Link>
            </div>
            <Search/>
            <nav>
                <ul>
                    <li>
                        <Link href={'/events'}>
                            <a>Events</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
