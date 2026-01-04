//function Header
import 'normalize.css'
import '../assets/header.css'
import logo from '../assets/TT_IMG_Logo.png';

export default function Header(){

    return(
        <>
        <header>
            <nav>
                <div className='navbar'>
                    <div className='nav-item'>
                        <a href="#" alt="Modal_Info" >¿Qué es <span>Caspita</span>?</a>
                    </div>
                    <div className='nav-item-logo'>
                        <img src={logo} alt="logo-caspita" />
                        <h1>CASPITA</h1>
                    </div>
                    <div className='nav-item'>
                        <a href="#" alt="Modal_Manual">Manual de Usuario</a>
                    </div>
                </div> 
            </nav>
        </header>
            
        </>
    )

}
//export default Header