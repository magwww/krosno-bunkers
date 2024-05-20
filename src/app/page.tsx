// export default async function Home() {
//     const res = await fetch("https://api.dane.gov.pl/1.4/resources/54637,schrony-zlokalizowane-w-miescie-krosno/data");
//     const { data: bunkers } = await res.json()
//
//   return (
//     <main className="flex min-h-screen flex-col items-center p-24">
//      <p className="mb-20">Hello from Krosno Bunkers!</p>
//         <ul>
//             {bunkers.map(((bunker: any) => bunker.attributes)).map((attr: any) => (
//                 <li key={`${attr.col1.val}${attr.col2.val}`}>{attr.col5.val}, {attr.col4.val}, {attr.col1.val}, {attr.col2.val}</li>
//             ))}
//         </ul>
//     </main>
//   );
// }

import {type Bunker} from "@/types"

async function getBunkers() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-bunkers`)

    if (!res.ok) {
        throw new Error('Failed to fetch bunkers')
    }

    return res.json()
}


export default async function Home() {
    const {bunkers} = await getBunkers()

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <p className="mb-20">Hello from Krosno Bunkers!</p>
            <ul>
                {bunkers.map(({id, longitude, latitude, capacity, address}: Bunker) => (
                    <li key={id}>{longitude}, {latitude}, {capacity}, {address}</li>
                ))}
            </ul>
        </main>
    )
}