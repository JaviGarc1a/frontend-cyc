'use client'
import { useState } from 'react'
import Modal from './components/modal'
import Searchbar from './components/searchbar'
import Sidebar from './components/sidebar'
import Link from 'next/link'

export default function Home() {
	const [verModal,setVerModal] = useState(false)
	return (
		<main className='wallpaper'>
			<Sidebar/>
			<Searchbar/>
			<Modal isVisible={verModal} onClose={()=>setVerModal(false)} />
			<Link href={"/families/2"}>
			<button className={`bg-cyan-500 rounded-full top-3/4 left-1/4 w-28 relative ${verModal?'blur':''}`}> Probar modal</button>
			</Link>
		</main>
	)
}
