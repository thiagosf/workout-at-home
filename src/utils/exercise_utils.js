const getMuscleGroups = exercises => {
  const muscleGroups = exercises.map(exercise => exercise.muscle_groups)
    .flat()
  return muscleGroups
    .map(muscleGroup => muscleGroup.name)
    .filter((item, index, items) => items.indexOf(item) === index)
    .map(name => {
      const muscleGroup = muscleGroups
        .find(muscleGroup => muscleGroup.name === name)
      return {
        ...muscleGroup,
        count: exercises.filter(exercise =>
          exercise.muscle_groups.map(v => v.name)
            .includes(name)
        ).length
      }
    })
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      return 0
    })
}

const filterExercises = ({
  list,
  selectedMuscleGroup,
  selectedEquipaments
}) => {
  const output = list.filter(item => {
    if (selectedMuscleGroup) {
      return item.muscle_groups
        .map(item => +item.id)
        .includes(selectedMuscleGroup)
    }
    return true
  }).filter(item => {
    if (selectedEquipaments && selectedEquipaments.length > 0) {
      const ids = item.requirements
        .map(item => +item.id)
      const included = selectedEquipaments.map(value => {
        if (value === 'all') {
          return true
        } else {
          return ids.includes(+value)
        }
      })
      return included.some(v => v)
    }
    return true
  })
  return output
}

const getEquipaments = exercises => {
  let equipaments = exercises.map(exercise => {
    return exercise.requirements.map(item => ({
      label: item.name,
      value: item.id.toString()
    }))
  }).flat()
  equipaments = equipaments.sort((a, b) => {
    if (a.label < b.label) return -1
    if (a.label > b.label) return 1
    return 0
  })
  equipaments = [{
    label: 'All equipaments',
    value: 'all'
  }].concat(equipaments)
  const equipamentValues = equipaments.map(item => item.value)
  equipaments = equipaments.filter((item, index) => {
    return equipamentValues.indexOf(item.value) === index
  })
  return equipaments
}

export default {
  getMuscleGroups,
  filterExercises,
  getEquipaments
}
