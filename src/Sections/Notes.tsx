import NoteCard from "@/components/NoteCard";
import { Note } from "@/lib/drizzle";

export const checkEnvironment = () => {
    let base_url =
        process.env.VERCEL_ENV === "development"
            ? "http://localhost:3000"
            : "https://notes-app-eta-beryl.vercel.app";
    return base_url;
};

export async function getData() {
    const res = await fetch(`${checkEnvironment()}/api/notes`, {
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const Notes = async () => {

    const { data }: { data: Note[] } = await getData()

    return (
        <div className="grid grid-cols-4 gap-8 my-10">
            {data.length > 0
                ? data.map((item) => {

                    return (
                        <NoteCard key={item.id} note={item} />
                    )
                }
                )
                :
                <h3 className="text-lg font-medium">No notes to show</h3>
            }
        </div>
    )
}

export default Notes
