import './Arrow.css';

function Arrow() {

    function func1() {
        return "func1 text";
    }

    const func2 = () => {
        return "func2 text";
    }

    const func3 = () => "func3 text"

    function btn1() {
        console.log(func1());
        console.log(func2());
        console.log(func3());
    }

    /*
    onClick={()=>{ 함수명() }}
    onClick={함수명}
    */
    return (
        <div className='arrow'>
            <p>화살</p>
            <p>함수</p>
            <p><button onClick={btn1}>버튼1</button></p>
            <p><button onClick={() => btn1()}>버튼11</button></p>
        </div>
    )
}

export default Arrow