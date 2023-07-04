import { Action, AnyAction, Reducer } from "@reduxjs/toolkit";

export function undoable<S = any, A extends Action = AnyAction>(reducer: Reducer<S, A>) {
    let initialState = reducer(undefined, { type: '' } as A);
    let historyQueue: any[] = [initialState];
    let historyIndex = 0;
    // 返回处理撤消和重做的 reducer
    return function (state = initialState, action: AnyAction): S {
        switch (action.type) {
            case 'UNDO':
                console.log(historyQueue)
                return historyIndex === 0 ? historyQueue[0] : historyQueue[--historyIndex];
            case 'REDO':
                console.log(historyQueue)
                return historyIndex === historyQueue.length - 1 ? historyQueue[historyQueue.length - 1] : historyQueue[++historyIndex];
            default:
                // 代理传给 reducer 的 action
                const newState = reducer(state, action as A)
                // 抛弃所有Index之后的历史记录
                historyQueue = historyQueue.slice(0, historyIndex + 1);
                if (action?.payload?.recordInHistory === true) {
                    historyQueue.push(newState);
                    historyIndex = historyQueue.length - 1;
                    console.log(historyQueue)
                    return newState;
                }
                else {
                    console.log(historyQueue)
                    return newState;
                }
        }
    }
};

export function undo() {
    return { type: 'UNDO' };
}

export function redo() {
    return { type: 'REDO' };
}
