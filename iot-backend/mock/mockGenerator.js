const axios = require('axios');

function generateRandomSensorData(){
    return{
        temperature:(Math.random()*10 + 20).toFixed(2),
        humidity:(Math.random()*20+40).toFixed(2),
        powerUsage:(Math.random()*200+100).toFixed(2)
    };
}

setInterval(async()=>{
    const data = generateRandomSensorData();
    try{
        await axios.post('http://localhost:5000/api/sensor',data)
        console.log('Data mocked successfully', data)
    }
    catch(err){
        console.error('Caught error while mocking data:', err.message)
    }
}, 5000)