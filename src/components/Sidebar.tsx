import logo from '../assets/logo.png';
import { BiLogOut } from 'react-icons/bi';
import { SidebarLink } from '../store/types/SidebarLink';
import { NavLink } from 'react-router-dom';
import { useTitle } from '../context/TitleContext';

type SidebarProps = {
  sidebarLinks: SidebarLink[];
};

const Sidebar = ({ sidebarLinks }: SidebarProps) => {
  const { setTitle } = useTitle();
  return (
    <nav className='h-full w-full bg-[rgba(255,_255,_255,_0.50)] flex flex-col text-black sidebar-shaddow gap-6 px-3 py-7 select-none'>
      <div className='flex items-center justify-center gap-3 px-4 py-3 font-montserrat min-h-[60px]'>
        <img alt='Logo' src={logo} draggable="false"></img>
        <span className='text-neutral-950 text-4xl font-semibold letter-spacing-title'>MiTutor</span>
      </div>
      <div className="py-5 flex flex-1 flex-col gap-2 cursor-pointer">
        {sidebarLinks.map((link, index) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-primary text-white flex flex-start items-center gap-6 font-roboto text-base px-4 py-2 rounded-lg font-semibold'
                : 'text-stone-700 flex flex-start items-center gap-6 font-roboto text-base px-4 py-2 hover:text-primary'
            }
            to={link.path}
            key={index} onClick={() => {
              setTitle(link.label);
            }}>
            <span className="text-xl">{link.icon}</span>
            <span className="leading-5">{link.label}</span>
          </NavLink>
        ))}
      </div>
      <a className='text-stone-700 flex flex-start items-center gap-6 font-roboto text-base px-4 py-2 hover:text-primary'>
        <span className="text-xl"><BiLogOut fontSize={32} /></span>
        <span className='leading-4'>Cerrar Sesión</span>
      </a>
    </nav>
  );
};

export default Sidebar;