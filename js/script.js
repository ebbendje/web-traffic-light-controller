let connected = false;
let currentSignal = null;
let semaphoreId = null;
let autoCycleInterval;

const vehicleSignals = {'R':false, 'G':false, 'Y':false};
const pedestrianSignals = {'RP':false, 'GP':false};

function connect() {
    const idInput = document.getElementById('id-input');
    semaphoreId = idInput.value;
    if (semaphoreId) {
        connected = true;
        document.getElementById('status').textContent = 'yes';
        document.getElementById('status').classList.add('connected');
        addOutput(`Conectado`);
    } else {
        addOutput('Error: ID inválido');
        document.getElementById('status').textContent = 'no';
        document.getElementById('status').classList.remove('connected');
    }
}

function setSignal(signal) {
    if (!connected) {
        addOutput('Error: Sem conexão, conecte-se primeiro.');
        return;
    }
    
    currentSignal = signal;
    
    if (signal === 'R') {
        vehicleSignals['R'] = !vehicleSignals['R'];
        addOutput(`Signal changed to RED on Semaphore #${semaphoreId}`);
    } else if (signal === 'Y') {
        vehicleSignals['Y'] = !vehicleSignals['Y'];
        addOutput(`Signal changed to YELLOW on Semaphore #${semaphoreId}`);
    } else if (signal === 'G') {
        vehicleSignals['G'] = !vehicleSignals['G'];
        addOutput(`Signal changed to GREEN on Semaphore #${semaphoreId}`);
    } else if (signal === 'RP') {
        pedestrianSignals['RP'] = !pedestrianSignals['RP'];
        addOutput(`Pedestrian Signal changed to RED on Semaphore #${semaphoreId}`);
    } else if (signal === 'GP') {
        pedestrianSignals['GP'] = !pedestrianSignals['GP'];
        addOutput(`Pedestrian Signal changed to GREEN on Semaphore #${semaphoreId}`);
    }

    if (vehicleSignals.R)
        document.getElementById('light1-red').classList.add('active');
    else
        document.getElementById('light1-red').classList.remove('active');
    if (vehicleSignals.Y)
        document.getElementById('light1-yellow').classList.add('active');
    else
        document.getElementById('light1-yellow').classList.remove('active');
    if (vehicleSignals.G)
        document.getElementById('light1-green').classList.add('active');
    else
        document.getElementById('light1-green').classList.remove('active');
    if (pedestrianSignals.RP)
        document.getElementById('light2-red').classList.add('active');
    else
        document.getElementById('light2-red').classList.remove('active');
    if (pedestrianSignals.GP)
        document.getElementById('light2-green').classList.add('active');
    else
        document.getElementById('light2-green').classList.remove('active');
}

function clearOutput() {
    document.getElementById('output').innerHTML = '';
}

function addOutput(message) {
    const output = document.getElementById('output');
    const time = new Date().getHours().toString().padStart(2, '0') + ':' + new Date().getMinutes().toString().padStart(2, '0');
    output.innerHTML += `[${time}] ${message}<br>`;
    output.scrollTop = output.scrollHeight;
}

window.onload = function() {
    addOutput('Sistema iniciado.');
};