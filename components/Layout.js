import {useRouter} from "next/router";
import Head from "next/head";
import styles from '@/styles/Layout.module.css'
import Header from "./Header";
import Showcase from "@/components/Showcase";
import Footer from "./Footer";

const Layout = ({title, keywords, description, children}) => {
    const router = useRouter()
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description}/>
                <meta name='keywords' content={keywords}/>
            </Head>
            <Header/>
            {router.pathname === '/' && <Showcase/>}
            <div className={styles.container}>
                {children}
            </div>
            <Footer/>

        </div>
    );
};

export default Layout;

Layout.defaultProps = {
    title: "Meowsic Events | Find the hottest meow parties",
    description: "Find the latest meowsical events",
    keywords: 'music, rock, pop, metal, party, events'
}


