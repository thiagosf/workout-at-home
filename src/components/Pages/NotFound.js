import React from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'

export default function NotFound () {
  return (
    <Layout>
      <h2>Not found!</h2>
      <Link to="/">Back to home</Link>
    </Layout>
  )
}
