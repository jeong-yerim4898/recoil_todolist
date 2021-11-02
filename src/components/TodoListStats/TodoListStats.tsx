import React from 'react';
import {useRecoilValue} from "recoil";
import {todoListStatsState} from "../../recoil/todo";
import TodoChart from "../TodoChart/TodoChart";
import './TodoListStats.scss';

function TodoListStats() {
    const {totalNum,totalCompletedNum,totalUncompletedNum,percentCompleted} = useRecoilValue(todoListStatsState);

    const formattedPercentCompleted = Math.round(percentCompleted*100);
    return (
        <article className={'stats'}>
            <ul>
                <li>Total items: {totalNum}</li>
                <li>Items completed: {totalCompletedNum}</li>
                <li>Items not completed: {totalUncompletedNum}</li>
                <li>Percent completed: {formattedPercentCompleted}</li>
            </ul>
            <TodoChart/>
        </article>
    );
}

export default TodoListStats;