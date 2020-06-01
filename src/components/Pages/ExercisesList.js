import React from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'

export default function ExercisesList () {
  return (
    <Layout>
      <h2>Exercises list</h2>
      <Link to="/">Home</Link>
      <br/>
      <Link to="/not-found">Not found</Link>
    </Layout>
  )
}
