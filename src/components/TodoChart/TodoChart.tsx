import React, {useCallback, useEffect, useState} from 'react';
import './TodoChart.scss';
import {useRecoilValue} from "recoil";
import {todoListStatsState} from "../../recoil/todo";

interface ArcData {
    x: number;
    y: number;
    radius: number;
    degree: number;
}

const MAX_DEGREE = 359.9;

function TodoChart() {

    const {totalNum, totalCompletedNum, totalUncompletedNum} = useRecoilValue(todoListStatsState);


    const radius = 20; // 차트 반지름
    const diameter = 2 * Math.PI * radius;// 원 둘레
    const colors = ["#ff6554", "#ffdc2a", "#27ff3d", "#1f7cff", "#b611ff"];
    const dataset = [totalCompletedNum,totalUncompletedNum];

    // 데이터의 총 합
    const total = dataset.reduce((r, v) => r + v, 0);
    // 도넛 시작점을 기억하기 위한  누적값
    const acc = dataset.reduce((result, value) => [...result, result[result.length - 1] + value], [0]);

    // 원그리기
   const drawCircle = useCallback(

        (): void => {
            const svg = document.getElementById('pi-svg');

            dataset.forEach((data: number, i: number) => {
                const radio = data / total; // 비율
                const fillSpace = diameter * radio; // 실제 차지하는 비율
                const emptySpace = diameter - fillSpace; // 전체에서 해당 데이터 차치 부분 빼고 나머지
                const offset = (acc[i] / total) * diameter; // 밀어주기

                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', '50');
                circle.setAttribute('cy', '50');
                circle.setAttribute('r', String(radius));
                circle.setAttribute('fill', 'transparent');
                circle.setAttribute('stroke', colors[i]);
                circle.setAttribute('stroke-width', '10');
                circle.setAttribute('stroke-dasharray', `${fillSpace} ${emptySpace}`);
                circle.setAttribute('stroke-dashoffset', String(-offset));

                // const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                // accDegree += MAX_DEGREE * radio;
                // path.setAttribute('d', `${getArc({x: 50, y: 50, radius: radius, degree: accDegree})}`);
                // path.setAttribute('fill', 'transparent');
                // path.setAttribute('stroke', colors[i]);


                svg?.appendChild(circle);
                // svg?.appendChild(path);
            });
        }
        , [dataset]);

    useEffect(() => {
        drawCircle();
    }, [dataset]);
    // n도 벌어진 점의 좌표
    const getCoordsOnCircle = ({x, y, radius, degree}: ArcData) => {
        const radian = (degree / 180) * Math.PI;

        return {
            x: x + radius * Math.cos(radian),
            y: y + radius * Math.sin(radian)
        }
    };

    const getArc = (data: ArcData) => {
        const startCoord = getCoordsOnCircle({...data, degree: 0});
        const finishCoord = getCoordsOnCircle({...data});


        const {x, y, radius, degree} = data;
        const isLargeArc = degree > 180 ? 1 : 0;
        const isEnd = degree === MAX_DEGREE;

        const d = `M ${startCoord.x} ${startCoord.y} A ${radius} ${radius} 0 ${isLargeArc} 1 ${finishCoord.x} ${finishCoord.y} L ${x} ${y} ${isEnd ? 'z' : ''}`;
        return d;
    };


    return (
        <article className={'chart'}>
            <svg width={500} height={500} viewBox={"0 0 100 100"} id={'pi-svg'}></svg>
        </article>
    );
}

export default TodoChart;