 let connected = false;
        let currentSignal = null;
        let semaphoreId = null;

        function connect() {
            const idInput = document.getElementById('id-input');
            semaphoreId = idInput.value;
            
            if (semaphoreId) {
                connected = true;
                document.getElementById('status').textContent = 'yes';
                document.getElementById('status').classList.add('connected');
                addOutput(`Connected to Semaphore #${semaphoreId}`);
                
                // Start auto cycle demo
                startAutoCycle();
            }
        }

        function setSignal(signal) {
            if (!connected) {
                addOutput('Error: Not connected to any semaphore');
                return;
            }
            
            currentSignal = signal;
            
            // Clear all lights
            document.querySelectorAll('.light').forEach(light => {
                light.classList.remove('active');
            });
            
            // Activate appropriate lights
            if (signal === 'R') {
                document.getElementById('light1-red').classList.add('active');
                document.getElementById('light2-green').classList.add('active');
                addOutput(`Signal changed to RED on Semaphore #${semaphoreId}`);
            } else if (signal === 'Y') {
                document.getElementById('light1-yellow').classList.add('active');
                document.getElementById('light2-yellow').classList.add('active');
                addOutput(`Signal changed to YELLOW on Semaphore #${semaphoreId}`);
            } else if (signal === 'G') {
                document.getElementById('light1-green').classList.add('active');
                document.getElementById('light2-red').classList.add('active');
                addOutput(`Signal changed to GREEN on Semaphore #${semaphoreId}`);
            }
        }

        function addOutput(message) {
            const output = document.getElementById('output');
            const time = new Date().toLocaleTimeString();
            output.innerHTML += `[${time}] ${message}<br>`;
            output.scrollTop = output.scrollHeight;
        }

        let autoCycleInterval;
        
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

        // Initialize with default state
        window.onload = function() {
            addOutput('System initialized. Please connect to a semaphore.');
        };