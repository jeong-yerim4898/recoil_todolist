import React from 'react';
import {GiWireCoil} from "react-icons/all";
import './TodoTitle.scss';

function TodoTitle() {
    return (
        <div className={'TodoTitle'}>
            <GiWireCoil className={'TodoTitle-Icon'} />
            <div className={'TodoTitle-Title'}> TodoList With Recoil</div>
        </div>
    );
}

export default TodoTitle;