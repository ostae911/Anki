import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

{/* Hier befindet sich ein vorgefertigte Navbar für die Website. Er wird auf jeder Seite zusammen mit dem Footer aufgerufen. Einige Links
habe ich angepasst. So die Links zu den Nebenseiten "Home, Suchen, Anbieten, Anmelden usw." */}
function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        Better Learning
                        <i className='fab fa-typo3' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Startseite
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/upload'
                                className='nav-links '
                                onClick={closeMobileMenu}
                            >
                                Karte erstellen
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/stack'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Kartenstapel
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/aboutus'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Über uns
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
