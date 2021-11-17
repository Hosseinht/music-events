import Head from "next/head";
import styles from '@/styles/Layout.module.css'
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({title, keywords, description, children}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description}/>
                <meta name='keywords' content={keywords}/>
            </Head>
          <Header/>
            <div className={styles.container}>
                {children}
            </div>
            <Footer/>

        </div>
    );
};

export default Layout;

Layout.defaultProps = {
    title: "Music Events | Find the hottest parties",
    description: "Find the latest musical events",
    keywords: 'music, rock, pop, metal, party, events'
}


