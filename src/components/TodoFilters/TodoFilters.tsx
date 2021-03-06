import React, {ChangeEvent} from 'react';
import './TodoFilters.scss';
import {useRecoilState} from "recoil";
import {todoListFilterState} from "../../recoil/todo";
import './TodoFilters.scss';

function TodoFilters() {
    const [filter, setFilter] = useRecoilState(todoListFilterState);

    const updateFilter = (event: ChangeEvent<{ value: unknown }>) => {
        setFilter(event.target.value as string);
    };
    return (
        <div className={'filter'}>
            <div className={'select'}>
                <select value={filter} onChange={updateFilter}>
                    <option value="Show All">All</option>
                    <option value="Show Completed">Completed</option>
                    <option value="Show Uncompleted">Uncompleted</option>
                </select>
            </div>

        </div>
    );
}

export default TodoFilters;