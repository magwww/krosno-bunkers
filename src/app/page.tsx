import {type Bunker} from "@/types"

//TODO: add env
async function getBunkers() {
    const res = await fetch('http://localhost:3000/api/get-bunkers')

    if (!res.ok) {
        throw new Error('Failed to fetch bunkers')
    }

    return res.json()
}

export default async function Home() {
    const { bunkers } = await getBunkers()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
     <p className="mb-20">Hello from Krosno Bunkers!</p>
        <ul>
            {bunkers.map(({id, longitude, latitude, capacity, address}: Bunker) => (
                <li key={id}>{longitude}, {latitude}, {capacity}, {address}</li>
            ))}
        </ul>
    </main>
  );
}
