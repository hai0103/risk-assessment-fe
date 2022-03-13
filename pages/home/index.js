import Head from "next/head";
import React from "react";
import Home from "../../components/home";
import HomeProvider from "../../components/home/context/homeContext";

function HomePage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <HomeProvider {...props}>
        <Home {...props}/>
      </HomeProvider>
    </React.Fragment>
  );
}

export default HomePage;
