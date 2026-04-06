let chart;

// Hora e data
function updateTime(){
  const now = new Date();
  document.getElementById('time').innerText = now.toLocaleTimeString();
  document.getElementById('date').innerText = now.toLocaleDateString();
}
setInterval(updateTime,1000);
updateTime();

// Entrar no sistema
function enterSystem(){
  document.getElementById('home').style.display='none';
  document.getElementById('dashboard').style.display='block';
  startCamera();
  loadChart();
}

// Gráfico
function loadChart(){
  const ctx = document.getElementById('chart');
  chart = new Chart(ctx,{
    type:'bar',
    data:{
      labels:['Estudando','Dormindo','Bagunçando'],
      datasets:[{
        label: 'Alunos',
        data:[0,0,0]
      }]
    }
  });
}

function updateChart(study,sleep,mess){
  chart.data.datasets[0].data=[study,sleep,mess];
  chart.update();
}

// Câmera real
async function startCamera(){
  try {
    const video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({video:true});
    video.srcObject = stream;
    simulateAI();
  } catch {
    alert("Permita acesso à câmera!");
  }
}

// Simulação de IA
function simulateAI(){
  setInterval(()=>{
    let study=Math.floor(Math.random()*30);
    let sleep=Math.floor(Math.random()*10);
    let mess=Math.floor(Math.random()*15);

    updateChart(study,sleep,mess);

    if(mess>10 || sleep>5){
      document.getElementById('alertSound').play();
      document.getElementById('status').innerText="⚠️ Atenção baixa detectada!";
    } else {
      document.getElementById('status').innerText="Tudo normal";
    }

    saveData(study,sleep,mess);
  },3000);
}

// Sugestões
function addTip(){
  const tip = document.getElementById('newTip').value;
  if(tip){
    const li=document.createElement('li');
    li.innerText=tip;
    document.getElementById('tips').appendChild(li);

    localStorage.setItem('tips',document.getElementById('tips').innerHTML);
    document.getElementById('newTip').value='';
  }
}

// Salvar dados
function saveData(study,sleep,mess){
  localStorage.setItem('dados',JSON.stringify({study,sleep,mess}));
}

// Carregar sugestões
window.onload=function(){
  if(localStorage.getItem('tips')){
    document.getElementById('tips').innerHTML=localStorage.getItem('tips');
  }
};
