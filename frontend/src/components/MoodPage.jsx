import react , { useState }from 'react';

const MoodPage = () =>{

    const [mood, setMood] = useState('');
    const [reason, setReason] = useState('');
    const [logs, setLogs] = useState([]);

    function print(mood){
        setMood(mood);
        console.log('selected mood', mood);
        console.log('selected reason', reason);
        const NewLog = { mood: mood, reason: reason};
        setLogs([...logs, NewLog]);
        setReason('');
    }

    function fill(m, r) {
        setMood(m);
        setReason(r);
      }
    
      function deleteLog(indexToDelete) {
        const updatedLogs = logs.filter((_, index) => index !== indexToDelete);
        setLogs(updatedLogs);
      }

    return <>
     <h1 className="text-bold">How are you feeling today?</h1>
      <button onClick={ () => print('happy')}>😊 Happy</button>
      <button onClick={ () =>print('meh')}>😐 Meh</button>
      <button onClick={ () => print('sad')}>😢 Sad</button>

      <textarea className='w-full h-40 mt-4' placeholder='WHY YOU ARE FEELING THIS WAY' onChange={ (e)=> setReason(e.target.value)} ></textarea>

      <h2>your mood logs</h2>
      <ul>
        {logs.map((entry, index) => (
            <li key={index}>
                <span
                  className="cursor-pointer"
                  onClick={() => fill(entry.mood, entry.reason)}
                >
                  {entry.mood} - "{entry.reason}"
                </span>
                <button
                  className="text-red-500 hover:text-red-700 font-bold"
                  onClick={() => deleteLog(index)}
                >
                  ❌
                </button>
            </li>
        ))}
      </ul>



    </>
}

export default MoodPage;