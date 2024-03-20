import './globals.css'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
	manifest: '/manifest.json'
}

export default function RootLayout({ children }) {
	return (
		<html lang="es">
			<body>{children}</body>
		</html>
	)
}
