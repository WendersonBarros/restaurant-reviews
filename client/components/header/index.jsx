import styles from './styles.module.scss';
import Logo from './assets/owl-svgrepo-com.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FcHome } from 'react-icons/fc';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation().pathname;

    const navigateToHome = () => {
        if (location.includes('restaurants')) return navigate('/');

        return window.open(
            'https://github.com/WendersonBarros/',
            '_blank',
            'noreferrer'
        );
    };

    return (
        <header>
            {location.includes('restaurants') ? (
                <FcHome className={styles.__logo} onClick={navigateToHome} />
            ) : (
                <Logo className={styles.__logo} onClick={navigateToHome} />
            )}

            {location.includes('restaurants') ? (
                <h1 className={styles.__title}>
                    {location.includes('update')
                        ? 'Update Restaurant'
                        : 'Restaurant Reviews'}
                </h1>
            ) : (
                <h1 className={styles.__title}>Restaurant Review List</h1>
            )}
        </header>
    );
}
