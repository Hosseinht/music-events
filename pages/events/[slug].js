import Link from 'next/link'
import Image from "next/image";
import {FaPencilAlt, FaTimes} from "react-icons/fa";
import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import styles from '@/styles/Event.module.css'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/router";
import {useState} from "react";
import Modal from "@/components/Modal";


const EventPage =  ({evt}) => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [delEvent, setDelEvent] = useState(false)

    return (
        <Layout>
            <div className={styles.event}>
                <span>
                    {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
                </span>
                <h1>{evt.name}</h1>
                <ToastContainer/>
                {evt.image && (
                    <div className={styles.image}>
                        <Image src={evt.image.formats.large.url} width={960} height={600}/>
                    </div>
                )}
                <h3>Performers:</h3>
                <p>{evt.performers}</p>
                <h3>Description:</h3>
                <p>{evt.description}</p>
                <h3>Venue: {evt.venue}</h3>
                <p>{evt.address}</p>

                <Link href={'/events'}>
                    <a className={styles.back}>
                        {'<'} Go Back
                    </a>
                </Link>
            </div>
            {/*<Modal show={showModal} onClose={() => setShowModal(false)}>*/}
            {/*    Are you sure?*/}
            {/*    <button onClick={() => setDelEvent(true)} className='btn'>Delete</button>*/}
            {/*</Modal>*/}
        </Layout>
    );
};

export default EventPage;

// export async function getStaticPaths() {
//     const res = await fetch(`${API_URL}/events`)
//     const events = await res.json()
//
//     const paths = events.map(evt => ({
//         params: {slug: evt.slug}
//     }))
//
//     return {
//         paths,
//         fallback: false
//     }
// }
//
//
// export async function getStaticProps({params: {slug}}) {
//     const res = await fetch(`${API_URL}/events?slug=${slug}`)
//     const events = await res.json()
//
//     return {
//         props: {
//             evt: events[0]
//         },
//         revalidate: 1
//     }
// }


// OR

export async function getServerSideProps({query: {slug}}) {
    const res = await fetch(`${API_URL}/events?slug=${slug}`)
    const events = await res.json()

    return {
        props: {
            evt: events[0]
        },
    }
}