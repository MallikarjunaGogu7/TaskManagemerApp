import React from 'react'
import CountDownTimer from './components/CountDownTimer'
import TaskMangement from './components/TaskMangement'
import Quotes from './components/Quotes'

const App = () => {
  return (
    <>
      <CountDownTimer/>
      <Quotes />
      <TaskMangement/>
    </>
  )
}

export default App