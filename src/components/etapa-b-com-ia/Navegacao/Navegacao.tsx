"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type SVGProps } from "react";

type IconName = "dashboard" | "users" | "reports" | "settings" | "support";

type NavigationItem = {
	href: string;
	label: string;
	icon: IconName;
};

const navigationItems: NavigationItem[] = [
	{ href: "/dashboard", label: "Dashboard", icon: "dashboard" },
	{ href: "/utilitaries", label: "Utilizadores", icon: "users" },
	{ href: "/reports", label: "Relatórios", icon: "reports" },
	{ href: "/settings", label: "Configurações", icon: "settings" },
	{ href: "/help", label: "Suporte", icon: "support" },
];

function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
	const paths: Record<IconName, React.ReactNode> = {
		dashboard: (
			<>
				<rect x="3" y="3" width="7" height="7" rx="1" />
				<rect x="14" y="3" width="7" height="7" rx="1" />
				<rect x="3" y="14" width="7" height="7" rx="1" />
				<rect x="14" y="14" width="7" height="7" rx="1" />
			</>
		),
		users: (
			<>
				<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
				<circle cx="9" cy="7" r="4" />
				<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
			</>
		),
		reports: (
			<>
				<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
				<path d="M14 2v6h6M8 13h8M8 17h5" />
			</>
		),
		settings: (
			<>
				<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
				<path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.41 1.41-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2v-.09a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.41-1.41.06-.06A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.56-1.03H7v-2h.84A1.7 1.7 0 0 0 9.4 11a1.7 1.7 0 0 0-.34-1.88L9 9.06l1.41-1.41.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 13.38 6.5V6h2v.5a1.7 1.7 0 0 0 1.03 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.41 1.41-.06.06A1.7 1.7 0 0 0 19.4 11a1.7 1.7 0 0 0 1.56 1.03H22v2h-1.04A1.7 1.7 0 0 0 19.4 15z" />
			</>
		),
		support: (
			<>
				<circle cx="12" cy="12" r="9" />
				<path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-2.9 2-2.9 4M12 17h.01" />
			</>
		),
	};

	return (
		<svg
			aria-hidden="true"
			fill="none"
			height="22"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.8"
			viewBox="0 0 24 24"
			width="22"
			{...props}
		>
			{paths[name]}
		</svg>
	);
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
	return <span className={`nav-menu-icon${isOpen ? " nav-menu-icon-open" : ""}`} aria-hidden="true" />;
}

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 767px)");
		const update = () => setIsMobile(mediaQuery.matches);

		update();
		mediaQuery.addEventListener("change", update);
		return () => mediaQuery.removeEventListener("change", update);
	}, []);

	return isMobile;
}

export default function Navegacao() {
	const pathname = usePathname();
	const isMobile = useIsMobile();
	const [isExpanded, setIsExpanded] = useState(true);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const isItemActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
	const navigationOpen = isMobile ? isDrawerOpen : true;
	const sidebarExpanded = isMobile ? isDrawerOpen : isExpanded;
	let toggleLabel = "Expandir menu";

	if (isMobile) {
		toggleLabel = "Abrir menu";
	} else if (sidebarExpanded) {
		toggleLabel = "Recolher menu";
	}

	return (
		<>
			<button
				aria-controls="main-navigation"
				aria-expanded={navigationOpen}
				aria-label={toggleLabel}
				className="nav-toggle"
				onClick={() => (isMobile ? setIsDrawerOpen((open) => !open) : setIsExpanded((expanded) => !expanded))}
				type="button"
			>
				<MenuIcon isOpen={navigationOpen} />
			</button>

			{isMobile && isDrawerOpen && (
				<button
					aria-label="Fechar menu"
					className="nav-overlay"
					onClick={() => setIsDrawerOpen(false)}
					type="button"
				/>
			)}

			<aside
				aria-label="Navegação principal"
				className={`nav-sidebar${sidebarExpanded ? " nav-sidebar-expanded" : ""}${navigationOpen ? " nav-sidebar-open" : ""}`}
				id="main-navigation"
			>
				<div className="nav-brand">
					<span className="nav-brand-mark">T</span>
					{sidebarExpanded && <span>Trabalho</span>}
				</div>

				<nav>
					<ul className="nav-list">
						{navigationItems.map((item) => {
							const active = isItemActive(item.href);

							return (
								<li key={item.href}>
									<Link
										aria-current={active ? "page" : undefined}
										className={`nav-link${active ? " nav-link-active" : ""}`}
										href={item.href}
										onClick={() => isMobile && setIsDrawerOpen(false)}
										title={!sidebarExpanded ? item.label : undefined}
									>
										<Icon name={item.icon} />
										{sidebarExpanded && <span>{item.label}</span>}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</aside>

			<style>{`
				.nav-toggle { align-items: center; background: #17324d; border: 0; border-radius: 0 0 8px 0; color: #fff; cursor: pointer; display: flex; height: 48px; justify-content: center; left: 0; position: fixed; top: 0; width: 48px; z-index: 30; }
				.nav-menu-icon, .nav-menu-icon::before, .nav-menu-icon::after { background: currentColor; display: block; height: 2px; position: relative; transition: transform 160ms ease, background 160ms ease; width: 20px; }
				.nav-menu-icon::before, .nav-menu-icon::after { content: ""; position: absolute; }
				.nav-menu-icon::before { top: -6px; }
				.nav-menu-icon::after { top: 6px; }
				.nav-menu-icon-open { background: transparent; }
				.nav-menu-icon-open::before { transform: translateY(6px) rotate(45deg); }
				.nav-menu-icon-open::after { transform: translateY(-6px) rotate(-45deg); }
				.nav-sidebar { background: #17324d; color: #d8e4ee; min-height: 100vh; padding: 72px 10px 24px; position: fixed; transform: translateX(0); transition: width 180ms ease, transform 180ms ease; width: 68px; z-index: 20; }
				.nav-sidebar-expanded { width: 236px; }
				.nav-brand { align-items: center; display: flex; gap: 12px; height: 40px; margin: 0 6px 34px; font-size: 16px; font-weight: 700; white-space: nowrap; }
				.nav-brand-mark { align-items: center; background: #e9b949; border-radius: 7px; color: #17324d; display: flex; height: 32px; justify-content: center; width: 32px; }
				.nav-list { display: grid; gap: 8px; list-style: none; padding: 0; }
				.nav-link { align-items: center; border-radius: 7px; color: inherit; display: flex; gap: 14px; min-height: 46px; overflow: hidden; padding: 0 13px; transition: background 140ms ease, color 140ms ease; white-space: nowrap; }
				.nav-link:hover { background: #294b68; color: #fff; }
				.nav-link-active { background: #e9b949; color: #17324d; font-weight: 700; }
				.nav-link-active:hover { background: #f0c968; color: #17324d; }
				.nav-overlay { background: rgba(10, 25, 39, 0.48); border: 0; inset: 0; position: fixed; z-index: 10; }
				@media (max-width: 767px) { .nav-sidebar { transform: translateX(-100%); width: 236px; } .nav-sidebar-open { transform: translateX(0); } }
			`}</style>
		</>
	);
}
