/* This example requires Tailwind CSS v2.0+ */
import Image from "next/image";
import {FC, Fragment ,useState,useContext,useEffect} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import {SlideOverContext,SlideOverInterface} from "../../../pages/_app";
import {useUserSession} from "../../layout";
import DropDown from "./Drop-down";


const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'About', href: '/about', current: false },
    { name: 'Courses', href: '/courses', current: false },
    { name: 'Placement', href: '/placement', current: false },
]

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}


const Nav:FC = ()=>{
    const {session,userSvg} = useUserSession();
    const [signIn,setSignIn] = useState<boolean>(false);
    const [menuState,setMenuState] = useState<boolean>(false);
    const {setSlideOverState} = useContext(SlideOverContext) as SlideOverInterface;
    useEffect(()=>{
        if(session){
            setSignIn(true);
        }else if(!session){
            setSignIn(false);
        }
    },[session]);

    return (
        <Disclosure as="nav" className="bg-black">
        {({ open }) => (
            <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                    </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                    <div className = "block">
                        <Image
                            width="32"
                            height="32"
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                            alt="Workflow"
                        />
                    </div>
                    
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                        {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </a>
                        ))}
                    </div>
                    </div>
                </div>
                {signIn?
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                    <DropDown setMenuState = {setMenuState} menuState = {menuState} session = {session}>
                        <div>
                            <button  onClick = {()=>menuState?setMenuState(false):setMenuState(true)} className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <div
                                className="h-8 w-8 rounded-full"
                                dangerouslySetInnerHTML={{ __html: userSvg!}}
                            />
                            </button>
                        </div>
                    </DropDown>
                    </Menu>
                </div>:
                <button onClick = {()=>setSlideOverState(true)} type="button" className="sm:px-8 px-4 py-2 sm:font-semibold rounded bg-indigo-600 text-white">Sign In</button>
                }
                </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                    <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                    >
                    {item.name}
                    </a>
                ))}
                </div>
            </Disclosure.Panel>
            </>
        )}
        </Disclosure>
    )
}


export default Nav;