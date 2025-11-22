 let connected = false;
        let currentSignal = null;
        let semaphoreId = null;
        let autoCycleInterval;

        function connect() {
            const idInput = document.getElementById('id-input');
            semaphoreId = idInput.value;
            if (semaphoreId) {
                connected = true;
                document.getElementById('status').textContent = 'yes';
                document.getElementById('status').classList.add('connected');
                addOutput(`Conectado`);
                startAutoCycle();
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
            
            document.querySelectorAll('.light').forEach(light => {
                light.classList.remove('active');
            });
            
            if (signal === 'R') {
                document.getElementById('light1-red').classList.add('active');
                addOutput(`Signal changed to RED on Semaphore #${semaphoreId}`);
            } else if (signal === 'Y') {
                document.getElementById('light1-yellow').classList.add('active');
                addOutput(`Signal changed to YELLOW on Semaphore #${semaphoreId}`);
            } else if (signal === 'G') {
                document.getElementById('light1-green').classList.add('active');
                addOutput(`Signal changed to GREEN on Semaphore #${semaphoreId}`);
            } else if (signal === 'RP') {
                document.getElementById('light2-red').classList.add('active');
                addOutput(`Pedestrian Signal changed to RED on Semaphore #${semaphoreId}`);
            } else if (signal === 'GP') {
                document.getElementById('light2-green').classList.add('active');
                addOutput(`Pedestrian Signal changed to GREEN on Semaphore #${semaphoreId}`);
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

        
        
        function startAutoCycle() {
            const signals = ['R', 'Y', 'G'];
            let index = 0;
            
            setSignal(signals[index]);
            
            clearInterval(autoCycleInterval);
            autoCycleInterval = setInterval(() => {
                index = (index + 1) % signals.length;
                setSignal(signals[index]);
            }, 3000);
        }

        window.onload = function() {
            addOutput('Sistema iniciado.');
        };