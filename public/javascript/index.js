//倒數計時器
function countDown(){
  const time = document.querySelector('.count-down')
  if(time){
    setInterval(()=>{
      if(dayjs.duration(dayjs().endOf('day').diff(dayjs())).hours() < 10){
        document.getElementById('hours').innerHTML = `0${dayjs.duration(dayjs().endOf('day').diff(dayjs())).hours()}`
      }else{
        document.getElementById('hours').innerHTML = `${dayjs.duration(dayjs().endOf('day').diff(dayjs())).hours()}`
      }
      if(dayjs.duration(dayjs().endOf('day').diff(dayjs())).minutes() < 10){
        document.getElementById('minutes').innerHTML = `0${dayjs.duration(dayjs().endOf('day').diff(dayjs())).minutes()}`
      }else{
        document.getElementById('minutes').innerHTML = `${dayjs.duration(dayjs().endOf('day').diff(dayjs())).minutes()}`
      }
      if(dayjs.duration(dayjs().endOf('day').diff(dayjs())).seconds() < 10){
        document.getElementById('seconds').innerHTML = `0${dayjs.duration(dayjs().endOf('day').diff(dayjs())).seconds()}`
      }else{
        document.getElementById('seconds').innerHTML = `${dayjs.duration(dayjs().endOf('day').diff(dayjs())).seconds()}`
      }
  },1000)
  }
}

//進度條
function taskProgress (){
  const tasks = document.querySelectorAll('.bi')
  const finishTasks = document.querySelectorAll('.bi-clipboard-check')
  const progress = document.getElementById('progress')
  const taskCountWord = document.querySelector('.task-count-word')
  if(progress){
    setInterval(()=>{
      if(tasks.length === 0)return taskCountWord.innerHTML = '完成進度:0%'
      progressRate = Math.floor((finishTasks.length/tasks.length) * 100)
      taskCountWord.innerHTML = `完成進度:${progressRate}%`
      progress.style.width = `${progressRate}%`
    },1000)
  }
}



countDown()
taskProgress()