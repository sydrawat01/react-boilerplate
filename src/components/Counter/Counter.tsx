import { FC } from 'react'
import ReduxLogo from '../../assets/redux-logo.svg'
// import '../../styles/components/Counter.scss'

import { useAppDispatch, useAppSelector } from '../../store/hooks/basicHooks'
import {
  increment,
  decrement,
  CounterSelector,
} from '../../store/reducers/counter'

const Counter: FC = () => {
  const counter = useAppSelector(CounterSelector)
  const dispatch = useAppDispatch()

  const incrementCounterHandler = () => {
    dispatch(increment())
  }
  const decrementCounterHandler = () => {
    dispatch(decrement())
  }
  return (
    <article className="Counter">
      <h1>{process.env.APP_COUNTER}</h1>
      <img src={ReduxLogo} className="Redux-Logo" alt="redux" />
      <div className="Control">
        <button className="Actions" onClick={decrementCounterHandler}>
          -
        </button>
        <h1>{counter}</h1>
        <button className="Actions" onClick={incrementCounterHandler}>
          +
        </button>
      </div>
    </article>
  )
}

export default Counter
