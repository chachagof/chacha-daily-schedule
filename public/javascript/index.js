//倒數計時器
function countDown(){
  setInterval(()=>{
  document.getElementById('hours').innerHTML = `${dayjs.duration(dayjs().endOf('day').diff(dayjs())).hours()}`
  document.getElementById('minutes').innerHTML = `${dayjs.duration(dayjs().endOf('day').diff(dayjs())).minutes()}`
  document.getElementById('seconds').innerHTML = `${dayjs.duration(dayjs().endOf('day').diff(dayjs())).seconds()}`
},1000)
}

//進度條
function taskProgress (){
  const tasks = document.querySelectorAll('.bi')
  const finishTasks = document.querySelectorAll('.bi-clipboard-check')
  const progress = document.getElementById('progress')
  const taskCountWord = document.querySelector('.task-count-word')
  setInterval(()=>{
    progressRate = Math.floor((finishTasks.length/tasks.length) * 100)
    taskCountWord.innerHTML = `完成進度:${progressRate}%`
    progress.style.width = `${progressRate}%`
  },1000)
}



countDown()
taskProgress()