import Link from "next/link";
import Layout from "../components/Layout";
const About = () => {
    return (
        <Layout title="About music event">
            <h1>About</h1>
            <Link href="/">Home</Link>
        </Layout>
    );
};

export default About;
