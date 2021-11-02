import React from 'react';
import './TodoTemplate.scss';
import TodoInput from '../TodoInput/TodoInput';
import TodoList from '../TodoList/TodoList';
import TodoTitle from '../TodoTitle/TodoTitle';
import TodoFilters from "../TodoFilters/TodoFilters";
import TodoListStats from "../TodoListStats/TodoListStats";
import TodoChart from "../TodoChart/TodoChart";
import {useRecoilValue} from "recoil";
import {todoListStatsState} from "../../recoil/todo";

function TodoTemplate() {


    return (
        <div className='TodoTemplate'>
            <div className='TodoTemplate-Contents'>
                <TodoTitle/>
                <TodoList/>
                <TodoInput/>
                <TodoFilters/>
                <TodoListStats/>
                {/*<TodoChart/>*/}
            </div>
        </div>
    );
}

export default TodoTemplate;