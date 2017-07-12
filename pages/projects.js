import { Component } from 'react'
import Head from 'next/head'
import Header from '~/components/header'

export default class extends Component {
  static async getInitialProps ({ req }) {
    // return req
    //   ? { userAgent: req.headers['user-agent'] }
    // : { userAgent: navigator.userAgent }
  }

  render() {
    <div>
      <Head>
        <title>Projects</title>
      </Head>
      <Header />

      Hello world
      <p>scoped!</p>
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
    </div>
  }
}
