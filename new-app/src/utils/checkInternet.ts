 const checkInternet=()=>{
   if(navigator.onLine){
    return true
   }
   else {
    alert('Нет интернет-соединения');
    return false
  } 
}
export default checkInternet
