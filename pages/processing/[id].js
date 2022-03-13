import React from "react";
import Head from "next/head";
import ProcessingList from "../../components/processing";

export default function ProcessingPage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>Processing</title>
      </Head>
      <ProcessingList {...props} />
    </React.Fragment>
  );
}

export async function getServerSideProps(router) {
    const {id} = router.query;
    return {
      props: {
        userId: id,
      }
    };
}
