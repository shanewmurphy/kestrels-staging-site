import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import DesktopHero from "@/components/Heros/Desktop-Hero";
import Sponsors from "@/components/Sponsors/sponsors";
import Fixtures from "@/components/Fixtures/Fixtures-Limited";
import ResultsLimited from "@/components/Results/Results";
import Douments from "@/components/Documents/Douments";
import History from "@/components/Club-History/History";
import Footer from "@/components/Footer/Footer";
import JoinClub from "@/components/Join-Club/Join-Club";

import { API_URL } from "@config/index";
import { GraphQLClient } from "graphql-request";

export default function Home(props) {
  const { fixtures } = props;
  const { result } = props;
  const { sponsors } = props;

  return (
    <div>
      <Head>
        <title>Kestrels Basketball Club Portarlington, Laois, Ireland</title>
        <meta name="description" content="Kestrels Basketball Club, Portarlington, Laois, Ireland" />
        <meta
          name="keywords"
          content="Kestrels Basketball Club, Basketball, Portarlington, Sports, Laois, Ireland"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <DesktopHero />
      </div>
      <div>
        <Fixtures fixtures={fixtures} />
      </div>
      <div>
        <ResultsLimited result={result} />
      </div>
      <div>
        <Douments />
      </div>
      <div>
        <History />
      </div>
      <div>
        <JoinClub />
      </div>
      <div>
        <Sponsors sponsors={sponsors} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const hygraph = new GraphQLClient(`${API_URL}`);
  const { fixtures, result, sponsors } = await hygraph.request(
    `
    {
      fixtures (first: 3 orderBy: createdAt_DESC) {
        id
        teamA
        teamB
        tournament
        location
        date
        time
      }
      result (first: 3 orderBy: createdAt_DESC) {
        id
        teamA
        teamAScore
        teamB
        teamBScore
        tournament
      }
      sponsors {
        id
        name
        sponsorLogo {
          height
          url
          width
        }
      }
    }

    `
  );
  return {
    props: {
      fixtures,
      result,
      sponsors,
    },
    revalidate: 10,
  };
}
