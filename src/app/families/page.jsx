import Link from 'next/link'
import Modal from './modal.jsx'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Card from '../components/card.jsx'
import { fetchFamily } from './fetchFamilies.js'

export default async function BeneficiariesList({ searchParams }) {
	const data = await fetchFamily()
	const show = searchParams?.show === 'true'

	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 overflow-y-scroll relative top-28">
			{data.map(family => (
				<Link href={`/families/${family.id}`} key={family.id}>
					<Card key={family.id} family={family} />
				</Link>
			))}
			{show && <Modal />}
		</div>
	)
}
