import React, {useCallback, useState} from 'react';
import {TodoTypes} from "../../../recoil/todo";
import {FaPen} from "react-icons/fa";
import {MdClose} from "react-icons/md";
import {SetterOrUpdater} from "recoil";
import './TodoItem.scss';
import TodoModal from "../../TodoModal/TodoModal";

interface PropTypes {
    id: number;
    contents: string;
    isCompleted: boolean;
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;

    todos: TodoTypes[];
    setTodos: SetterOrUpdater<TodoTypes[]>;
}


function TodoItem(props: PropTypes) {
    const {id, contents, isCompleted, onComplete, onDelete, todos, setTodos} = props;
    const [isModal, setIsModal] = useState<boolean>(false);
    const [modifyContents, setModifyContents] = useState<string>('');

    const onModify = useCallback((): void => {
        setIsModal(true);
        setModifyContents(contents);
        // 선택한 Todo의 내용을 default value로 지정하는 작업
    }, [contents]);

    const onModifyTodo = useCallback((): void => {
        if (!modifyContents.trim()) {
            return;
        }
        setTodos(todos.map((todo: TodoTypes) => {
            return todo.id === props.id ? {...todo, contents: modifyContents} : todo;
        }));
        setIsModal(false);
    }, [id, modifyContents, setTodos, todos]);

    return (
        <>
            <div className={'TodoItem'}>
            <div title={contents} className={isCompleted ? 'TodoItem-Completed' : ''} onClick={() => onComplete(id)}>
                {contents}
            </div>
            <div className={'TodoItem-Icons'}>
                <FaPen className={'TodoItem-Icons-Pen'} onClick={onModify}/>
                <MdClose className={'TodoItem-Icons-Close'} onClick={() => onDelete(id)}/>
            </div>
        </div>
            {
                isModal &&
                <TodoModal
                    setIsModal={setIsModal}
                    modifyContents={modifyContents}
                    setModifyContents={setModifyContents}
                    onModifyTodo={onModifyTodo} />}
        </>

    );
}

export default TodoItem;