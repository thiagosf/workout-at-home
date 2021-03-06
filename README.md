# workout@home

Webapp to help you exercise at home.

* Webapp: [https://thiagosf.github.io/workout-at-home](https://thiagosf.github.io/workout-at-home)
* Storybook: [https://thiagosf.github.io/workout-at-home/storybook](https://thiagosf.github.io/workout-at-home/storybook)

## Dev

### Storybook

```bash
yarn storybook
```

### Run webapp

```bash
yarn start
```

### Build webapp

```bash
yarn build
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
- [x] AddToHomeScreen

## Pages

- [x] Home
- [x] Exercices list
- [x] Workout
- [x] NextExercise
- [x] Finish
- [x] Onboarding
- [x] Not found
- [x] Saved lists

## Store

- [x] exercises

## Todo

- [x] Refactor `allColors` using `utils:valueByMode`
- [x] Create route view to `/workout`, add `/workout/next` and `/workout/finish` to mantain `Timer` on top
- [x] Add animations with `framer-motion`
- [x] Desktop version
- [ ] i18n support
- [x] Remove item on sort list
- [x] Improve confirmation component
- [x] Fix close button into add to home screen component
- [x] Onboarding scrollbars
- [x] Add sound on over seconds in an exercise
- [x] Add multiple times same exercise
- [x] Edit saved list
- [ ] Add custom exercise
- [ ] Create API to exercises list
- [x] Add animation on saved lists page
- [ ] Make .web.app domain (https://firebase.google.com/docs/hosting)

## Credits

- [Onboarding vectors](https://pt.vecteezy.com/arte-vetorial/133933-vetores-de-treinamento-de-desportista)
