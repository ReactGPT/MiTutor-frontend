import { Listbox, Transition } from '@headlessui/react';
//import { isArray } from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { ArrowDown,AddCircleIcon } from '../assets';

type FiltersProps = {
  name?: string;
  boxSize?: string;
  options:any[];
  value:any|null;
  text?: string;
  icon?:any;
  iconSize?:number;
  loading?: boolean;
  disabled?: boolean;
  onChange:(value:any)=>void;
  buttonStyle?: string;
};

export default function Combobox({
  name,
  boxSize,
  options = [],
  value,
  text,
  icon,
  iconSize=6,
  loading,
  disabled = false,
  onChange,  
  buttonStyle,
}: FiltersProps) {
  const [selected, setSelected] = useState(value);
  const displayedText = !value? text: value?.name ? value.name : '';
  console.log(displayedText);
  useEffect(() => {
    setSelected(value);
  }, [value]);
  const Icon=icon;
  return (
    <div data-testid="initial-display" className={boxSize}>
      <Listbox        
        disabled={disabled}
        value={selected}
        onChange={(value) => {
          setSelected(value);
          onChange(value);
        }}
      >
        <div className="relative mt-1">
          
          <Listbox.Button
            className={`${buttonStyle} relative w-full dark:bg-secondary bg-white py-2 ${icon? "pl-10": "pl-3"} pr-10 text-left focus:outline-none border border-secondary09 dark:border-0 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm rounded-lg ${
              disabled ? 'cursor-default' : 'cursor-pointer'
            }`}
          >
            
            <Listbox.Label
              className={`font-bold dark:text-secondary01 ${
                disabled ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
            </Listbox.Label>
            {icon && <Icon size={iconSize} className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black dark:text-secondary01"
                  aria-hidden="true"/>}
            
            <span className="pr-4 block truncate dark:text-secondary01 h-[20px]">
              <p className='block text-xs font-semibold'>{displayedText}</p>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ArrowDown
                className="h-5 w-5 text-black dark:text-secondary01"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute rounded-lg mt-2 max-h-60 w-full overflow-auto bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
              {options.map((option) => (
                  <Listbox.Option
                    key={`f-o-${option.id}-${option?.name}`}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-3 px-4 flex items-center hover:bg-secondary10
                      ${active ? 'bg-white' : 'text-gray-900'}
                      `
                    }
                    value={option}
                  >
                    {({ selected }) => (
                        <span
                          className={`block truncate flex-grow ${
                            selected ? 'font-medium' : 'font-normal'
                          }
                        `}
                        >
                          {option?.name}
                        </span>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
