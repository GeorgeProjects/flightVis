getDaySta(1481904000000)
getMonthSta(147525120000, 14832000000000)

self.serverIp = "http://127.0.0.1:22028/"

function getMonthSta(airport){
  /*
      Get month sta. data
      stTime: start time(13 bit timestamp)
      enTime: end time(13 bit timestamp)
  */
  var self = this
  var constraint = {};
  var formData = new FormData();
  constraint['databasetype'] = 'mongodb';
  constraint['datasetname'] = "dayStaMulti";
  constraint['airport'] = airport
  // constraint['enTime'] = enTime
  constraint=JSON.stringify(constraint)

  formData.append("constraint", constraint);

  var successGetPoints = function(response){
    console.log("get MonthSta");
    //console.log(' get MonthSta ', response);
    var monthSta = JSON.parse(response.data)
    //console.log(monthSta)
    window.MonthSta = monthSta
    console.log(window.MonthSta)

  }

  self.sendUrl('POST', self.serverIp + 'query/monthsta', formData, 'monthsta', '');
}
function getDaySta(dateTime){
  /*
      Get day sta. data
      dateTime: day time(13 bit timestamp)
  */
  var self  = this
  var constraint = {};
  var formData = new FormData();
  constraint['databasetype'] = 'mongodb';
  constraint['datasetname'] = "minuteStaMulti";
  constraint['dateTime'] = dateTime
  constraint=JSON.stringify(constraint)
  formData.append("constraint", constraint);
  var successGetPoints = function(response){
    console.log("get daySta");
    var daySta = JSON.parse(response.data)
    //console.log(daySta)
    window.DaySta = daySta
    console.log(window.DaySta)
  }

  self.sendUrl('POST', self.serverIp + 'query/daysta', formData, 'daysta', '');
}

function connectDB(){
  var self = this
  var formData = new FormData();

  formData.append("databasetype", 'mongodb');
  formData.append("dbName", 'flight');
  formData.append("port", 27066);
  formData.append("host", '192.168.10.9');
  var successFunc = function(response){
    console.log(" connect to DB ");
  }

  sendUrl('POST', self.serverIp + 'db/connect', formData, successFunc);
}

function sendUrl(PostType, Url, formData, v_id, v_task){
  var self = this
  self.trigger
  console.log("Url", Url)
  if(PostType == 'GET'){

    if (window.XMLHttpRequest){
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    }else{
      // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function(){
      // self.successPaperState(self);
      successPaperState();
    }
    xmlhttp.open(PostType, Url, true);
    xmlhttp.send(null);

  }else{
    $.ajax({
      url: Url,
      type: "POST",
      dataType: 'JSON',
      data: formData,
      crossDomain: true,
      processData: false,
      contentType: false,
      success: function(response) {
        // console.warn(response.data)
        var data = response.data
        if(data){
          //console.log(data)
          //console.log(v_id)
          if(v_id=="cdm" || v_id=="curtimedata" || v_id=="curtimedatahistogram" || v_id=="filterCircle" || v_id=="callsign"){
            //console.log(data)
            data = JSON.parse(data.replace(/\bNaN\b/g, "null"));
            //data = JSON.parse(data)
          }
          else{
            data = JSON.parse(data)
          }
          //data = JSON.parse(data.replace(/\bNaN\b/g, "null"));
          // console.log('v_id',data)
          // self.trigger("dataCenter_DataReady", {data: data, id: v_id, task: v_task});
        }
      },
      error: function(jqXHR, textStatus, errorMessage) {
        console.log('errorMessage'); // Optional
      }
    });
  }

}