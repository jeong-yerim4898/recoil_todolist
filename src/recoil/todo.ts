import {atom, selector} from "recoil";

export interface TodoTypes {
    id: number;
    contents: string;
    isCompleted: boolean;
}

// TodoInput에서 입력하는 값을 atom으로 관리
export const inputState = atom<string>({
    key: 'inputState',
    default: '',
});
// 업데이트 시킨 Todo atam 배열
export const todoState = atom<TodoTypes[]>({
    key: 'todoState',
    default: [
        {id: 1, contents: 'Todo1', isCompleted: false},
        {id: 2, contents: 'Todo2', isCompleted: false},
        {id: 3, contents: 'Todo3', isCompleted: false},
    ],
});
// 필터 기준
export const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'Show All',
});
// 필터링 된 todo 리스트
export const filterTodoListState = selector<any[]>({
    key: 'filteredTodoListState',
    get: ({get}:any) => {
        const filter = get(todoListFilterState);
        const list = get(todoState);

        switch (filter) {
            case 'Show Completed':
                return list.filter((item:TodoTypes) => item.isCompleted);
            case 'Show Uncompleted':
                return list.filter((item:TodoTypes) => !item.isCompleted);
            default:
                return list;
        }
    },
});
// todo 통계
export const todoListStatsState = selector<any>({
    key:'todoListStatsState',
    get:({get}:any) => {
        const todoList = get(todoState);
        const totalNum = todoList.length;
        const totalCompletedNum = todoList.filter((item:TodoTypes) => item.isCompleted).length;
        const totalUncompletedNum = totalNum - totalCompletedNum;
        const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

        return {
            totalNum,
            totalCompletedNum,
            totalUncompletedNum,
            percentCompleted,
        }
    }
});