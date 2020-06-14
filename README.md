# Workout Home

Webapp to help you exercise at home.

## Dev

### Storybook

```bash
yarn storybook
```

### Run webapp

```bash
yarn start
```

## Components

- [x] MuscularGroupCount
- [x] ColorModeSwitch
- [x] Logo
- [x] ExerciseHeader
- [x] TabBarMainButton
- [x] TabBarButton
- [x] PagingDots
- [x] MuscularGroup
- [x] ExerciseCard
- [x] Exercise
- [x] Header
- [x] TabBar
- [x] ExerciseCarousel
- [x] ExerciseFilters
- [x] ExerciseMiniControls
- [x] ExerciseMiniList
- [x] ExerciseMiniNext
- [x] EmptyList
- [x] RepetitionCount
- [x] Timer
- [x] WaitBeforeNextExercise
- [x] Finish
- [x] MuscleGroupBody
- [x] NumberControl
- [x] RestBetweenExercises

## Pages

- [x] Home
- [x] Exercices list
- [x] Workout
- [x] Wait before next
- [x] Finish
- [ ] Not found

## Store

- [ ] exercises

## Todo

- [ ] Refactor `allColors` using `utils:colorByMode`
- [ ] Create route view to `/workout`, add `/workout/next` and `/workout/finish` to mantain `Timer` top bar
