export default async function Home() {
    const res = await fetch("https://api.dane.gov.pl/1.4/resources/54637,schrony-zlokalizowane-w-miescie-krosno/data");
    const { data: bunkers } = await res.json()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
     <p className="mb-20">Hello from Krosno Bunkers!</p>
        <ul>
            {bunkers.map((bunker => bunker.attributes)).map(attr => (
                <li key={`${attr.col1.val}${attr.col2.val}`}>{attr.col5.val}, {attr.col4.val}, {attr.col1.val}, {attr.col2.val}</li>
            ))}
        </ul>
    </main>
  );
}
