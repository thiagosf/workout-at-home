import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { showFooter } from '../../store/actions/base'
import { removeExercise } from '../../store/actions/exercise'

function ExercisesList ({
  exercise,
  removeExercise,
  showFooter
}) {
  const leftButton = {
    label: 'Clear list',
    icon: 'broom'
  }
  const mainButton = {
    label: 'Start!',
    icon: 'ray'
  }
  const goToEditList = () => console.log('goToEditList')

  React.useEffect(() => {
    showFooter(true)
  }, [showFooter])

  return (
    <Layout
      leftButton={leftButton}
      mainButton={mainButton}
      onClickLeft={goToEditList}
      onClickMainButton={goToEditList}
    >
      <h2>Exercises list</h2>
      <Link to="/">Home</Link>
    </Layout>
  )
}

const mapStateToProps = ({ exercise }) => ({ exercise })
const mapDispatchToProps = {
  removeExercise,
  showFooter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExercisesList)
