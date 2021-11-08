import React from 'react';
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

    const {totalCompletedNum, totalUncompletedNum} = useRecoilValue(todoListStatsState);


    const radius = 80; // 차트 반지름
    const diameter = 2 * Math.PI * radius;// 원 둘레
    const colors = ["#e02e1e", "#281B1AFF", "#ff73cb", "#fff75c", "#93ff57"];
    // const dataset = [totalCompletedNum, totalUncompletedNum,];
    const dataset = [35, 8, 2, 3, 10];
    // 데이터의 총 합
    const total = dataset.reduce((r, v) => r + v, 0);
    // 도넛 시작점을 기억하기 위한  누적값
    const acc = dataset.reduce((result, value) => [...result, result[result.length - 1] + value], [0]);

    const DrawCircle = (): JSX.Element => {
        return <>{
            dataset.map((v, i) => {
                const radio = v / total; // 비율
                const fillSpace = diameter * radio; // 실제 차지하는 비율
                const emptySpace = diameter - fillSpace; // 전체에서 해당 데이터 차치 부분 빼고 나머지
                const offset = (acc[i] / total) * diameter; // 밀어주기
                return <path cx={50} cy={50} r={radius}
                             stroke={colors[i]}
                             strokeWidth={10}
                             fill={"transparent"}
                             strokeDasharray={`${fillSpace} ${emptySpace}`}
                             strokeDashoffset={-offset}/>
            })
        }
        </>
    };


    // n도 벌어진 점의 좌표
    const getCoordsOnCircle = ({x, y, radius, degree}: ArcData) => {
        const radian = ((degree - 90) / 180) * Math.PI;

        return {
            x: x + radius * Math.cos(radian),
            y: y + radius * Math.sin(radian)
        }
    };

    const getArc = (data: ArcData) => {
        const startCoord = getCoordsOnCircle({...data});
        const finishCoord = getCoordsOnCircle({...data, degree: 0});


        const {x, y, radius, degree} = data;
        const isLargeArc = degree > 180 ? 1 : 0;

        return `M ${startCoord.x} ${startCoord.y} 
        A ${radius} ${radius} 0 ${isLargeArc} 0 ${finishCoord.x} ${finishCoord.y} 
        L ${x} ${y} `;
    };

    function getStartRotate(idx: number) {
        return dataset.filter((_, i) => i < idx).reduce((all, v) => v + all, 0);
    }


    const DrawPi = (): JSX.Element => {
        return <>{
            dataset.map((v, i) => {
                const startRotate = getStartRotate(i);
                const radio = v / total;
                const rotateAngle = startRotate / total * MAX_DEGREE;
                const d = getArc({x: 200, y: 200, radius, degree: radio * MAX_DEGREE});
                const targetRad = 2 * Math.PI * radius * radio;
                const targetRestRad = 2 * Math.PI * radius * (1 - radio);
                return (
                    <path d={`${d}`}
                          key={i}
                          stroke={'transparent'}
                          transform={`rotate(${rotateAngle},200,200) `}
                          fill={colors[i]}/>
                )
            })
        }
        </>
    };


    return (
        <article className={'chart'}>
            <svg width={400} height={400} viewBox={"0 0 400 400"} id={'pi-svg'}>
                <defs>
                    <mask id="myMask">
                        <circle cx={200} cy={200} r={200} fill={"white"}/>
                        <circle cx={200} cy={200} r={20} fill={"black"}/>
                    </mask>
                </defs>

                {/*<DrawCircle/>*/}
                <g mask={"url(#myMask)"}>
                    <DrawPi/>
                </g>
            </svg>
        </article>
    );
}

export default TodoChart;