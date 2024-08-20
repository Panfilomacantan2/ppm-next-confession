import { Facebook, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<footer className="container flex flex-col lg:flex-row justify-between items-start lg:items-center py-5 text-sm">
			<div className="flex flex-col  lg:flex-row lg:space-x-10">
				<p>© {new Date().getFullYear()} panfilo.dev</p>
				<p>All Rights Reserved</p>
				<p>Panfilo Panong Macantan</p>
			</div>

			<div className="flex my-4 space-x-4 ">
				<Link href="/" className="cursor-pointer text-lg" target="_blank">
					<Github />
				</Link>
				<Link href="/" className="cursor-pointer text-lg" target="_blank">
					<Linkedin />
				</Link>
				<Link href="/" className="cursor-pointer text-lg" target="_blank">
					<Facebook />
				</Link>
				<Link href="/" className="cursor-pointer text-lg" target="_blank">
					<Mail />
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
