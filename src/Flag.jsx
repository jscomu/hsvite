import './Flag.css';
import { useEffect, useState, useRef } from 'react';
import jData from './assets/flag.json'

function Flag() {
    const [num, setNum] = useState(0);
    const [count, setCount] = useState(0);
    const [inputStr, setInpuStr] = useState('');
    const [correct, setCorrect] = useState(false);
    const inputRef = useRef(null);

    function onSubmit() {
        console.log('버튼 클릭!' + inputStr);
        inputRef.current.value = null;  //값 초기화
        if(jData.flags[num] === inputStr) {
            setCorrect(true);
        } else {
            setCorrect(false);
        }
        setCount(count+1);
    }

    useEffect( () => {
        console.log('useEff');
        const random = Math.floor(Math.random() * 10);  // 0~9
        setNum(random);
    }, [count]);

    function keyDown(e) {
        if(e.key === 'Enter') {
            onSubmit();
        }
    }
    return (
        <div className='container'>
            <div>국기 맞추기</div>
            <div><img src={'/imgFlag/' + String(num) + '.png'} /></div>
            <div>{count > 0 ? (correct ? '정답' : '오답') : '-' }</div>
            <div>횟수:{count}</div>
            <div>
                <input placeholder='정답을 입력하세요'
                    onChange={e => setInpuStr(e.target.value)}
                    onKeyDown={keyDown}
                    ref={inputRef}
                />
                <button className='btn' onClick={() => onSubmit()}>확인</button>
            </div>
        </div>
    )
}

export default Flag