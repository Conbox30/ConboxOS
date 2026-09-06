//print card/div's
function Goto(divID){
    document.getElementById('home').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
    document.getElementById('reboot').style.display = 'none';
    document.getElementById('menu').style.display = 'none';

    if(divID){
        document.getElementById(divID).style.display = 'block';
        document.getElementById('menu').style.display = 'flex';
    }
}
//login:
function login(e){
    e.preventDefault();
    
    //password and name from inputfield
    let pw = document.getElementById('pw').value;
    let name = document.getElementById('username').value;

    //Waring!! Not for a real Login System
    if(name === 'admin' && pw === '1234'){
        document.getElementById('home').style.display = 'block';
        document.getElementById('menu').style.display = 'flex';
        document.getElementById('login').style.display = 'none';

    }else{
        alert('Username or Password Wrong!')
        document.getElementById('pw').value = '';
    }
}
//if reboot button has click
document.getElementById('btn-reboot').addEventListener('click', function(){
    alert('Router has rebooted!')
    setTimeout(() => {
        Goto('login')
        document.getElementById('menu').style.display = 'none'
    },5000)
})
//random number for uptime and cpu:
function CPUlast(){
    setInterval(function(){
        let cpuNumber = Math.round(Math.random() * 80) + 5;
        document.getElementById('cpu').innerText = `${cpuNumber}%`;
    },2000)
}

CPUlast();
uptime();

//the uptime
let sec = 30;
let min = 47;
let hours = 18;
let days = 5;
function uptime(){
    setInterval(function(){
        sec++;
        if (sec >= 60) {
            sec = 0;
            min++;
        }
        if (min >= 60) {
            min = 0;
            hours++;
        }
        if (hours >= 24) {
            hours = 0;
            days++;
        }
        document.getElementById('uptime').innerText = `${days}d ${hours}h ${min}m ${sec}s`;
    },1000)
}

//Settings
//WLAN Settings
function updateWLAN(e){
    e.preventDefault();

    let name = document.getElementById('wlan-name').value;
    let pw = document.getElementById('wlan-password').value;

    alert(`Wlan name: ${name} Wlan Password: ${pw}`)
}
//Open PORT
document.getElementById('btn-port').addEventListener('click',function(){
    let port = document.getElementById('port').value;
    alert(`PORT: ${port} has opened`)

    let printPORT = document.getElementById('open-port').innerText += port + ',';
})
//devices list:
const devices = [
    {name: 'S26 from Alexander', ip: '192.168.1.162'},
    {name: 'Gaming-PC', ip: '192.168.1.198'},
    {name: 'HomeKino-Nas', ip: '192.168.1.169'},
    {name: 'Synology-Nas', ip: '192.168.1.168'}
]
//render devices and handle ban
function showDevices(){
    const mac = document.getElementById('mac-ban');
    if(!mac) return;

    mac.innerHTML = '';

    devices.forEach((device, index) => {
        mac.innerHTML += `
            <div class='device'>
                <button class='ban-btn' data-index='${index}'><span>Name: ${device.name} IP: ${device.ip}</span> Ban</button>
                <br><br>
            </div>
        `;
    });

    const buttons = document.querySelectorAll('.ban-btn');

    buttons.forEach(btn => {
        let clicks = 0; 
        
        btn.addEventListener('click', function(){
            clicks++;
            const deviceIndex = this.getAttribute('data-index');
            const device = devices[deviceIndex];

            if (clicks % 2 !== 0) {
                this.innerText = `Name: ${device.name} IP: ${device.ip} Unbanned`;
            } else {
                this.innerText = `Name: ${device.name} IP: ${device.ip} Ban`;
            }
        });
    });
}
showDevices();
