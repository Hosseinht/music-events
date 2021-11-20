import Link from "next/link";
import Layout from "@/components/Layout";
import {API_URL, PER_PAGE} from "@/config/index";
import EventItem from "@/components/EvnentItem";
import Pagination from "@/components/Pagination";


export default function EventPage({events, total, page}) {


    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.map((evt) => (
                <EventItem evt={evt} key={evt.id}/>
            ))}

            <Pagination page={page} total={total}/>

        </Layout>
    )
}

export async function getServerSideProps({query: {page = 1}}) {
    // Calculate start page
    //+ page make it an integer. it's a string
    // 0 is the beginning of the event
    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

    // Fetch total/count
    const totalRes = await fetch(`${API_URL}/events/count`)
    const total = await totalRes.json()

    // Fetch Events
    const eventsRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
    const events = await eventsRes.json()

    return {
        props: {events, page: +page, total},
    }
}
