'use client'

import { useState } from 'react'
import styles from './Navegacao.module.css'
import { Menu, ChartNoAxesCombined, ClipboardPlus, Ellipsis, Cog, Headset } from 'lucide-react'
import useMediaQuery from '@/hooks/useMediaQuery'
import { usePathname } from "next/navigation";
import Link from 'next/link'


export default function Navegacao() {
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const isMobile = useMediaQuery("(max-width: 768px)");

    const pathname = usePathname();
    console.log(pathname)

    const toggleMenu = (event: React.MouseEventHandler<HTMLSpanElement>) => {
        setOpenMenu(prev => !prev)
    }

    return (
        <>
            {openMenu || !isMobile ? (
                <nav className={styles.navigationContainer}>
                    <span onClick={toggleMenu}><Menu size={36} strokeWidth={2} color='black'/></span>
                    <ul className={styles.navigationExpanded}>
                        <Link href={"/dashboard"}>
                            <li className={`${styles.navigationExpandedItem} ${pathname === "/dashboard" && styles.active}`}><ChartNoAxesCombined size={36} color={`${pathname === "/dashboard" ? "blue":"black"}`}/>Dashboard</li>
                        </Link>
                        <Link href={"/utilitaries"}>
                            <li className={`${styles.navigationExpandedItem} ${pathname === "/utilitaries" && styles.active}`}><Ellipsis size={36} color={`${pathname === "/utilitaries" ? "blue":"black"}`}/>Utilizadores</li>
                        </Link>
                        <Link href={"/reports"}>
                            <li className={`${styles.navigationExpandedItem} ${pathname === "/reports" && styles.active}`}><ClipboardPlus size={36} color={`${pathname === "/reports" ? "blue":"black"}`}/>Relatórios</li>
                        </Link>
                        <Link href={"/settings"}>
                            <li className={`${styles.navigationExpandedItem} ${pathname === "/settings" && styles.active}`}><Cog size={36} color={`${pathname === "/settings" ? "blue":"black"}`}/>Configurações</li>
                        </Link>
                        <Link href={"/help"}>
                            <li className={`${styles.navigationExpandedItem} ${pathname === "/help" && styles.active}`}><Headset size={36} color={`${pathname === "/help" ? "blue":"black"}`}/>Suporte</li>
                        </Link>
                    </ul>
                </nav>
            ) : (
                <nav className={styles.navigationContainerExpanded}>
                    <span onClick={toggleMenu}><Menu size={36} strokeWidth={2} color='black'/></span>
                    <ul className={styles.navigationExpanded}>
                        <Link href={"/dashboard"}>
                            <li className={styles.tooltip}><ChartNoAxesCombined size={32} color={`${pathname === "/dashboard" ? "blue" : "black"}`} />
                                <p className={styles.tooltiptext}>
                                    Dashboard
                                </p>
                            </li>
                        </Link>
                        <Link href={"/utilitaries"}>
                            <li className={styles.tooltip}><Ellipsis size={32} color={`${pathname === "/utilitaries" ? "blue" : "black"}`} />
                                <p className={styles.tooltiptext}>
                                    Utilizadores
                                </p>
                            </li>
                        </Link>
                        <Link href={"/reports"}>

                            <li className={styles.tooltip}><ClipboardPlus size={32} color={`${pathname === "/reports" ? "blue":"black"}`} />
                                <p className={styles.tooltiptext}>
                                    Relatórios
                                </p>
                            </li  >
                        </Link>
                        <Link href={"/settings"}>
                            <li className={styles.tooltip}><Cog size={32} color={`${pathname === "/settings" ? "blue":"black"}`} />
                                <p className={styles.tooltiptext}>
                                    Configurações
                                </p>
                            </li>
                        </Link>

                        <Link href={"/help"}>
                            <li className={styles.tooltip}><Headset size={32} color={`${pathname === "/help" ? "blue":"black"}`} />
                                <p className={styles.tooltiptext}>
                                    Suporte
                                </p>
                            </li>
                        </Link>

                    </ul>
                </nav>

            )}

        </>
    )
}