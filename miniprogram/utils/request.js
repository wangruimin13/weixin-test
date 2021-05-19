const request = function(wx,option){
  return wx.cloud.callFunction({
    ...option
  }).then(res=>{
    if (res.errMsg === 'cloud.callFunction:ok'){
      return res.result;
    }
    return res;
  }).catch(error=>{
    console.log(error);
  })
}

module.exports = request;