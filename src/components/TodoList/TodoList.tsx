import React,{useCallback} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {filterTodoListState, todoState, TodoTypes} from '../../recoil/todo';
import TodoItem from '../TodoList/TodoItem/TodoItem';
import './TodoList.scss';

function TodoList() {
    const [todos,setTodos] = useRecoilState<TodoTypes[]>(todoState);
    const todosfilter = useRecoilValue(filterTodoListState);

    const onComplete = useCallback((id:number):void => {
        setTodos(todos.map((todo:TodoTypes)=> {
            return todo.id === id? {...todo,isCompleted:!todo.isCompleted} :todo;
        }));
    },[setTodos,todos]);

    const onDelete = useCallback((id:number)=> {
        setTodos(todos.filter((todo:TodoTypes)=>todo.id!==id));
    },[setTodos,todos]);

    return (
        <div className={'TodoList'}>
            {todos.length>0?todosfilter.map((todo:TodoTypes)=> {
                const {id,contents,isCompleted}=todo;

                return (
                <TodoItem
                    key={id}
                    id={id}
                    contents={contents}
                    isCompleted={isCompleted}
                    onComplete={onComplete}
                    onDelete={onDelete}
                    todos={todos}
                    setTodos={setTodos}
                />
                );
            }) :
                <div className={'TodoList-NoList'}>Todo가 없습니다. 자유롭게 추가해주세요!</div>
            }
        </div>
    );
}

export default TodoList;