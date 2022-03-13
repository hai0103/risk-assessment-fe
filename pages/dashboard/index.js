import React from "react";
import Head from "next/head";
import Dashboard from "../../components/dashboard";

export default function DashboardPage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Dashboard {...props} />
    </React.Fragment>
  );
}
