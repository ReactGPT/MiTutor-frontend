import logo from '../assets/logo.png';
import { BiLogOut } from 'react-icons/bi';
import { SidebarLink } from '../store/types/SidebarLink';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context';
import { useState } from 'react';

type SidebarProps = {
  sidebarLinks: NavBarOption[];
};

type NavBarOption = {
  rol: "STUDENT" | "SPECIALTYMANAGER" | "FACULTYMANAGER" | "ADMIN" | "TUTOR" | "DERIVATION" | "CAREMANAGER";
  title: string;
  links: SidebarLink[];
};


const Sidebar = ({ sidebarLinks }: SidebarProps) => {
  const { handleLogout } = useAuth();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  // const NavOptions:NavBarOption[]=[
  //   {
  //     rol: 'STUDENT',
  //     title:'Alumno',
  //     links : sidebarLinks
  //   },
  //   {
  //     rol: 'MANAGER',
  //     title:'Coordinador',
  //     links : sidebarLinks
  //   },
  //   {
  //     rol: 'TUTOR',
  //     title:'Tutor',
  //     links : sidebarLinks
  //   }
  // ]
  return (
    <nav className='h-full w-full bg-[rgba(255,_255,_255,_0.50)] flex flex-col text-black sidebar-shaddow gap-6 px-3 py-7 select-none'>
      <div className='flex items-center justify-center gap-3 px-4 py-3 font-montserrat min-h-[60px]'>
        <img alt='Logo' src={logo} draggable="false"></img>
        <span className='text-neutral-950 text-4xl font-semibold letter-spacing-title'>MiTutor</span>
      </div>
      <div id="accordion-collapse" data-accordion="collapse" className="py-5 flex flex-1 flex-col gap-2">

        {/* <h2 id="accordion-flush-heading-1">
          <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" 
              data-accordion-target="#accordion-flush-body-1" 
              aria-expanded="true" 
              aria-controls="accordion-flush-body-1"
              >
            <span>Alumno</span>
            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2> */}

        {/* <div id="accordion-flush-body-1" className='hidden' aria-labelledby="accordion-flush-heading-1">
          <div className="py-5 border-b border-gray-200 dark:border-gray-700">
          {sidebarLinks.map((link, index) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'bg-primary text-white flex flex-start items-center gap-6 font-roboto text-base px-4 py-2 rounded-lg font-semibold'
                  : 'text-stone-700 flex flex-start items-center gap-6 font-roboto text-base px-4 py-2 hover:text-primary'
              }
              to={link.path}
              key={index}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="leading-5">{link.label}</span>
            </NavLink>
          ))}   
          
          </div>
        </div> */}
        {sidebarLinks.length > 1 && sidebarLinks.map((item, index) => (
          <div key={index} className="border-b border-gray-300">
            <h2 id="accordion-flush-heading-1">
              <button type="button"
                className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                onClick={() => handleItemClick(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`accordion-body-${index}`}
              >
                <span>{item.title}</span>
                <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                </svg>
              </button>
            </h2>
            {/* <button
            type="button"
            className="w-full p-4 text-left font-semibold focus:outline-none bg-white"
            onClick={() => handleItemClick(index)}
            aria-expanded={activeIndex === index}
            aria-controls={`accordion-body-${index}`}
          >
            
          </button> */}
            {activeIndex === index && (
              <div
                id={`accordion-body-${index}`}
                className="p-4 bg-gray-100"
                aria-labelledby={`accordion-heading-${index}`}
              >
                {item.links.map((link, index) => (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-primary text-white flex flex-start items-center gap-6 font-roboto text-base px-4 py-2 rounded-lg font-semibold'
                        : 'text-stone-700 flex flex-start items-center gap-6 font-roboto text-base px-4 py-2 hover:text-primary'
                    }
                    to={link.path}
                    key={index}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="leading-5">{link.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
        {sidebarLinks.length === 1 && sidebarLinks[0].links.map((link, index) => (

          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-primary text-white flex flex-start items-center gap-6 font-roboto text-base px-4 py-2 rounded-lg font-semibold'
                : 'text-stone-700 flex flex-start items-center gap-6 font-roboto text-base px-4 py-2 hover:text-primary'
            }
            to={link.path}
            key={index}
          >

            <span className="text-xl">{link.icon}</span>
            <span className="leading-5">{link.label}</span>
          </NavLink>
        ))}

      </div>
      <button className='text-stone-700 flex flex-start items-center gap-6 font-roboto text-base px-4 py-2 hover:text-primary' onClick={() => handleLogout()}>
        <span className="text-xl"><BiLogOut fontSize={32} /></span>
        <span className='leading-4'>Cerrar Sesión</span>
      </button>
    </nav>
  );
};

export default Sidebar;