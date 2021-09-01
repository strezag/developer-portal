import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getMarkdownData, getPageLevelInfoForFile } from '../lib/getMarkdownData';
import { useRouter } from 'next/dist/client/router';
import ReactMarkdown from 'react-markdown';
import { MarkdownMeta, MarkdownAsset } from '../interfaces/markdownAsset';

export async function getStaticProps() {
    const learnFolder = "learn";
    const pageInfo = await getPageLevelInfoForFile("learn.md", learnFolder);
    const starterKits = await getMarkdownData("starterkits.md", learnFolder);
    const gettingStarted = await getMarkdownData("gettingstarted.md", learnFolder);
    const learningSitecore = await getMarkdownData("learningSitecore.md", learnFolder);
  
    return {
        props: {
            pageInfo,
            starterKits,
            gettingStarted,
            learningSitecore
        },
    };
}

export default function Learn({ pageInfo, starterKits, gettingStarted, learningSitecore }: {pageInfo: MarkdownMeta, starterKits: MarkdownAsset, gettingStarted: MarkdownAsset, learningSitecore: MarkdownAsset}) {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{pageInfo.prettyName}</title>
                <meta name="description" content={pageInfo.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    {pageInfo.prettyName}
                </h1>
                <p>
                    {pageInfo.description}
                </p>
                <div className={styles.grid}>
                    <div className={styles.productCategoryCard}>
                        <ReactMarkdown>{starterKits.markdown}</ReactMarkdown>
                    </div>
                    <div className={styles.productCategoryCardLarge}>
                        <ReactMarkdown>{gettingStarted.markdown}</ReactMarkdown>
                    </div>
                    <div className={styles.productCategoryCardLarge}>
                        <ReactMarkdown>{learningSitecore.markdown}</ReactMarkdown>
                    </div>
                    <div className={styles.youtubeCard}>
                        <h2>Discover Sitecore YouTube feed (5 most recent videos) 🎥</h2>
                    </div>
                    <div className={styles.socialsCard}>
                        <h2>Latest #LearnSitecore tweets 🕊</h2>
                    </div>
                    <div className={styles.socialsCard}>
                        <h2>News &amp; Announcements</h2>
                        <a href="" className={styles.link}><li>Cool new things</li></a>
                    </div>
                </div>
            </main>
        </div>)
}
