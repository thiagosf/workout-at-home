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

export default { getMuscleGroups }
