let connected = false;
let currentSignal = null;
let semaphoreId = null;
let autoCycleInterval;

let deviceAddress = null;

const vehicleSignals = {'R':false, 'G':false, 'Y':false};
const pedestrianSignals = {'RP':false, 'GP':false};

function connect() {
    const idInput = document.getElementById('id-input');
    semaphoreId = idInput.value;
    deviceAddress = `http://${semaphoreId}`;
    if (semaphoreId) {
        fetch(`${deviceAddress}/connect`).then(response => {
            if (response.ok) {
                connected = true;
                document.getElementById('status').textContent = 'yes';
                document.getElementById('status').classList.add('connected');
                addOutput(`Conexão estabelecida com o semáforo ID: ${semaphoreId}`);
            } else {
                addOutput(`Erro ao conectar com o semáforo ID: ${semaphoreId}`);
            }
        }).catch(error => {
            addOutput(`Erro ao conectar com o semáforo ID: ${semaphoreId}`);
            addOutput(`Detalhes do erro: ${error}`);
        });
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

    if (vehicleSignals.R) {
        document.getElementById('light1-red').classList.add('active');
        document.getElementById('r-button').classList.add('on');
        fetch(`${deviceAddress}/vehicle-red-on`);
    } else {
        document.getElementById('light1-red').classList.remove('active');
        document.getElementById('r-button').classList.remove('on');
        fetch(`${deviceAddress}/vehicle-red-off`);
    }
    if (vehicleSignals.Y) {
        fetch(`${deviceAddress}/vehicle-yellow-on`).then(() => {
            document.getElementById('light1-yellow').classList.add('active');
            document.getElementById('y-button').classList.add('on');
        });
    } else {
        fetch(`${deviceAddress}/vehicle-yellow-off`).then(() => {
            document.getElementById('light1-yellow').classList.remove('active');
            document.getElementById('y-button').classList.remove('on');
        });
    }
    if (vehicleSignals.G) {
        document.getElementById('light1-green').classList.add('active');
        document.getElementById('g-button').classList.add('on');
    } else {
        fetch(`${deviceAddress}/vehicle-green-off`).then(() => {
            document.getElementById('light1-green').classList.remove('active');
            document.getElementById('g-button').classList.remove('on');
        });
    }
    if (pedestrianSignals.RP) {
        fetch(`${deviceAddress}/pedestrian-red-on`).then(() => {
             document.getElementById('light2-red').classList.add('active');
            document.getElementById('rp-button').classList.add('on');
        });  
    } else {
        fetch(`${deviceAddress}/pedestrian-red-off`).then(() => {
            document.getElementById('light2-red').classList.remove('active');
            document.getElementById('rp-button').classList.remove('on');
        });
    }
    if (pedestrianSignals.GP) {
        fetch(`${deviceAddress}/pedestrian-green-on`).then(() => {
            document.getElementById('light2-green').classList.add('active');
            document.getElementById('gp-button').classList.add('on');
        });
    } else {
        fetch(`${deviceAddress}/pedestrian-green-off`).then(() => {
            document.getElementById('light2-green').classList.remove('active');
            document.getElementById('gp-button').classList.remove('on');
        });
    }
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
}