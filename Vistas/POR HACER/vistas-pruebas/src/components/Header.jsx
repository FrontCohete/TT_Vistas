//function Header
import 'normalize.css'
import '../assets/header.css'
import logo from '../assets/TT_IMG_Logo.png';

export default function Header(){

    return(
        <>
        <header>
            <nav>
                <div>
                    <h1>TT-2027 </h1>
                    <img src={logo} alt="" />
                    <a href="#" alt="Modal_AcercaDe">Acerca de</a>
                    <a href="#" alt="Modal_Preguntas">Preguntas</a>
                </div>
                
            </nav>
        </header>
            
        </>
    )

}
//export default Header