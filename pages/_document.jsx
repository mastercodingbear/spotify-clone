import Document, { Html, Head, Main, NextScript } from "next/document";

export default class _document extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <style
            data-href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=optional"
            rel="stylesheet"
          ></style>
        </Head>
        <body>
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
}
