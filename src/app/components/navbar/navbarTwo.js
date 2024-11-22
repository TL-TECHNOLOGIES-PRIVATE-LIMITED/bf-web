'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'

import { LuSearch, BiBriefcaseAlt2, HiOutlinePresentationChartLine, AiOutlinePieChart, SiSimpleanalytics, BsPhone, FiAirplay, CgClapperBoard, ImLoop2, GiStamper, TbCoinBitcoin, RiCupLine, FiUser, ImImage, PiBracketsCurly, FiThumbsUp, TfiLayoutListThumb, AiOutlineShopping, LuBookMinus } from "../../assets/icons/vander"
import { IoRestaurantOutline } from "react-icons/io5"

export default function NavbarTwo({ navClass, manuClass, navDark }) {
    let [scroll, setScroll] = useState(false);
    let [isMenu, setisMenu] = useState(false);
    let [searchBox, setSearchBox] = useState(false)

    let [manu, setManu] = useState('');
    let pathname = usePathname();

    useEffect(() => {
        setManu(pathname)
        function scrollHandler() {
            setScroll(window.scrollY > 50)
        }
        if (typeof window !== "undefined") {
            window.addEventListener('scroll', scrollHandler);
            window.scrollTo(0, 0);
        }
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [setManu]);


    // Toggle menu
    const toggleMenu = () => {
        setisMenu(!isMenu);
        if (document.getElementById("navigation")) {
            const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
            anchorArray.forEach(element => {
                element.addEventListener('click', (elem) => {
                    const target = elem.target.getAttribute("href")
                    if (target !== "") {
                        if (elem.target.nextElementSibling) {
                            var submenu = elem.target.nextElementSibling.nextElementSibling;
                            submenu.classList.toggle('open');
                        }
                    }
                })
            });
        }
    };


    return (
        <>
            <header id="topnav" className={`${scroll ? "nav-sticky" : ""} ${navClass}`}>
                <div className="container">
                    {navDark === true ?
                        <Link className="logo" href="/">
                            <Image src='/images/logo-dark.png' width={110} height={30} className="logo-light-mode" alt="" />
                            <Image src='/images/logo-light.png' width={110} height={30} className="logo-dark-mode" alt="" />
                        </Link> :
                        <Link className="logo" href="/">
                            <span className="logo-light-mode">
                                <Image src='/images/logo-dark.png' width={110} height={30} className="l-dark" alt="" />
                                <Image src='/images/logo-light.png' width={110} height={30} className="l-light" alt="" />
                            </span>
                            <Image src='/images/logo-light.png' width={110} height={30} className="logo-dark-mode" alt="" />
                        </Link>
                    }
                    <div className="menu-extras">
                        <div className="menu-item">
                            <Link href="#" className={`navbar-toggle ${isMenu ? 'open' : ''}`} id="isToggle" onClick={() => toggleMenu()}>
                                <div className="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <ul className="buy-button list-inline mb-0">
                        <li className="list-inline-item search-icon mb-0">
                            <div className="dropdown">
                                {navDark === true ?
                                    <button type="button" className="btn btn-link text-decoration-none dropdown-toggle mb-0 p-0 show" onClick={() => setSearchBox(!searchBox)}>
                                        <LuSearch className="h5 text-dark mb-0" />
                                    </button> :
                                    <button type="button" className="btn btn-link text-decoration-none dropdown-toggle mb-0 p-0 show" onClick={() => setSearchBox(!searchBox)}>
                                        <LuSearch className="h5 text-dark nav-light-icon-dark mb-0" />
                                        <LuSearch className="h5 text-white nav-light-icon-white mb-0" />
                                    </button>
                                }

                                <div className={`${searchBox === true ? "show" : ''} dropdown-menu dd-menu dropdown-menu-end bg-white shadow rounded border-0 mt-4 py-0`} style={{ width: '300px', inset: '0px 0px auto auto', position: 'absolute', transform: "translate(0px, 31px)" }}>
                                    <form className="p-4">
                                        <input type="text" id="text" name="name" className="form-control border bg-white" placeholder="Search..." />
                                    </form>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div id="navigation" style={{ display: isMenu ? 'block' : 'none' }}>
                        <ul className={manuClass}>
                            <li className={manu === "/" || "" ? "active" : ""}><Link href="/" className="sub-menu-item">Home</Link></li>
                            <li className={manu === "/aboutus" || "" ? "active" : ""}><Link href="/aboutus" className="sub-menu-item">About Us</Link></li>
                            <li className={manu === "/services" || "" ? "active" : ""}><Link href="/services" className="sub-menu-item">Services</Link></li>

                            <li className={`${[ "/portfolio",  "/faqs", "/team" ,"/blogs"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}>
                                <Link href="#">Explore</Link><span className="menu-arrow"></span>
                                <ul className="submenu">
                                    <li><Link href="/team" className="sub-menu-item">Team</Link></li>
                                    <li><Link href="/blogs" className="sub-menu-item">Blogs</Link></li> 
                                    <li><Link href="/portfolio" className="sub-menu-item">Portfolio</Link></li>
                                    <li><Link href="/faqs" className="sub-menu-item">FAQs</Link></li>
                                </ul>
                            </li>
                            <li className={manu === "/contact" || "" ? "active" : ""}><Link href="/contact" className="sub-menu-item">Contact us</Link></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}