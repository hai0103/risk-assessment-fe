import Head from "next/head";
import React from "react";
import Maintenance from "../components/maintenance";

function HomePage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <Maintenance/>
    </React.Fragment>
  );
}

export default HomePage;
