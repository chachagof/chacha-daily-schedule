function countDown(){
  setInterval(()=>{
  document.getElementById('hours').innerHTML = `${dayjs.duration(dayjs().endOf('day').diff(dayjs())).hours()}`
  document.getElementById('minutes').innerHTML = `${dayjs.duration(dayjs().endOf('day').diff(dayjs())).minutes()}`
  document.getElementById('seconds').innerHTML = `${dayjs.duration(dayjs().endOf('day').diff(dayjs())).seconds()}`
},1000)
}


countDown()
