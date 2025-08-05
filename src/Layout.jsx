import './Layout.css';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <nav>
                <div className='tit'>ExcitingCoding</div>
                <ul>
                    {/* <li><Link to="/">Home</Link></li> */}
                    {/* <li><Link to="/Prof">Profile</Link></li> */}
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Prof">Profile</Link></li>
                    <li><Link to="/Flag">국기</Link></li>
                    <li><Link to="/Intro">소개</Link></li>
                    <li><Link to="/Tetris">Tetris</Link></li>
                    <li><Link to="/Pacman">Pacman</Link></li>
                </ul>
                <div>#</div>
            </nav>
            <main><Outlet /></main>
        </div>
    )
}

export default Layout