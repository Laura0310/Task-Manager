import useScroll from '../hooks/useScroll';

const NavBar = (): JSX.Element => {
    const visible = useScroll();


    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center py-3 px-6 bg-white shadow-lg transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className='flex flex-row gap-2 items-center'>
                <i className='fa fa-solid fa-clipboard-list text-xl'></i>
                <h1 className='text-xl '>Gestor de Tareas</h1>
            </div>
        </nav>
    );
};

export default NavBar;