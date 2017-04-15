/**
 * 
 */
function Calendar(options){
	var me = this;
	me.element = $(options.element);
	me.startDate = options.startDate;
	me.inteval = options.inteval||7;
	me.date = me.getDates();
	me.index=0;
	me.renderCalendar();
}
//函数输出结果
/**
 * [{
 * 	date: 2016-09-03
 *  dateStr : '09/04',
 *  weekNane : '周日'
 * },
 * {
 * 	date: 2016-09-04 
 *  dateStr : '09/05',
 *  weekNane : '周一'
 * }]
 */
//日期的累加
Calendar.prototype.getDates = function(){
	var me=this;
	
	if(me.inteval%7!=0){
		alert("时间跨度应该是7的倍数");
	 }
	var result=[];
	var time=me.startDate.getTime();
	
  for(var i=0;i<me.inteval;i++){
	var date=new Date(time+i*24*3600*1000);
	var month=date.getMonth()+1;
	var day=date.getDate();
	var weekName=me.getWeekName(date.getDay());
    month=month<10?'0'+month:month;
    day=day<10?'0'+day:day;
    
    var dateStr=month+'/'+day;
    result.push({
    	date:date,
        dateStr:dateStr,
        weekName:weekName
    });
  }
  //console.log(result);
  return result;
	
}
//获得星期几
 Calendar.prototype.getWeekName=function(day){
	 var weekName=['周日','周一','周二','周三','周四','周五','周六'];
	 return weekName[day];
 } 
 
 //使用 jquery 添加ul li 即添加日期  
 Calendar.prototype.renderCalendar=function(){
	  var me=this;
	 
	  me.lastBtn=$("<div class=' container-img-lastBtn-disable'></div>");
	  me.nextBtn=$("<div class=' container-img-nextBtn-enable'></div>");
	  me.ul=$("<ul class='container-ul'></ul>");
	  for(var i=0;i<7;i++){
		  
		  me.li=$("<li class='container-ul-li'>" +
				  " <div class='container-date '>"+me.date[i].dateStr+"</div>"+
				  " <div class='container-week'>"+me.date[i].weekName+"</div>"+
		  		"</li>");
		  $(me.ul).append(me.li);
		  
		 
	  }
	  me.element.append(me.lastBtn).append(me.ul).append(me.nextBtn);
	    
	  //添加点击事件
	  me.lastBtn.on('click',function(event){
		  if(!me.lastBtn.hasClass("container-img-lastBtn-enable")){
			  return;
		  }
		 
		  me.index--;
		 
		 
		  me.changeStatus();
		  me.searchDay();
		  me.getDate();
		  
	  });
	  me.nextBtn.on('click',function(event){
		  if(!me.nextBtn.hasClass("container-img-nextBtn-enable")){
			  return;
		  }
		  me.index++;
		  
		  me.changeStatus();
		  me.searchDay();
		  me.getDate();
		  
	  });
	  
	  //添加鼠标移动事件
	me.lastBtn.on('mouseover mouseout',function(event){
		  if(event.type=='mouseover'){
			 if( me.lastBtn.hasClass("container-img-lastBtn-enable")){
				 me.lastBtn.addClass("container-img-lastBtn-hover");
			 }
		  }else{
			  me.lastBtn.removeClass("container-img-lastBtn-hover");
		  }
	  });
	  me.nextBtn.on('mouseover mouseout',function(event){
		  if(event.type=='mouseover'){
			 if( me.nextBtn.hasClass("container-img-nextBtn-enable")){
				 me.nextBtn.addClass("container-img-nextBtn-hover");
			 }
		  }else{
			  me.nextBtn.removeClass("container-img-nextBtn-hover");
		  }
	  });
	  
 }
 
 //替换日期
 Calendar.prototype.searchDay=function(date){
	 var me=this;
	 
	
	 var dateDom=me.element.find(".container-date");
	 var weekDom=me.element.find(".container-week");
	 //自己写的
	/* var start=(me.index-1)*7;
	 if(start<me.inteval){
	 for(var i=0;i<7;i++){
		 $(dateDom[i]).html(date[start+i].dateStr);
		 
		
		 $(weekDom[i]).html(date[start+i].weekName);
	 }
	 }*/

	 for(var i=0;i<7;i++){
	  if(me.index*7+i<me.inteval){
		 
		 $(dateDom[i]).html(me.date[me.index*7+i].dateStr);
		 $(weekDom[i]).html(me.date[me.index*7+i].weekName);
		  
		 }
		 
		
	 }
	

 }
 Calendar.prototype.changeStatus=function(){
	 
	 var me=this;
	 //自己写的
	/*if(me.index==0&&me.lastBtn.hasClass('container-img-lastBtn-enable')){
		 me.lastBtn.removeClass("container-img-lastBtn-enable");
		 me.lastBtn.addClass("container-img-lastBtn-disable");
		 me.lastBtn.removeClass("container-img-lastBtn-hover");
		
	
	
	}else  if(me.index==(me.inteval/7)&&me.nextBtn.hasClass('container-img-nextBtn-enable')){
		 me.nextBtn.removeClass("container-img-nextBtn-enable");
		 me.nextBtn.addClass("container-img-nextBtn-disable");
		 me.nextBtn.removeClass("container-img-nextBtn-hover");
	
	 }else{
		 
		 me.lastBtn.addClass("container-img-lastBtn-enable");
		 me.nextBtn.addClass("container-img-nextBtn-enable");
		 
		 
	 }	 */
	 
	 //添加左按钮的状态改变
	 if(me.index==0&&me.lastBtn.hasClass('container-img-lastBtn-enable')){
		 me.lastBtn.removeClass("container-img-lastBtn-enable");
		 me.lastBtn.removeClass("container-img-lastBtn-hover");
	 }else{
		 me.lastBtn.addClass("container-img-lastBtn-enable");
	 }
	 
	 //添加右按钮的状态改变
	 if(me.index==(me.inteval/7-1)&&me.nextBtn.hasClass('container-img-nextBtn-enable')){
		 me.nextBtn.removeClass("container-img-nextBtn-enable");
		 me.nextBtn.addClass("container-img-nextBtn-disable");
		 me.nextBtn.removeClass("container-img-nextBtn-hover");
	 }else{
		 me.nextBtn.addClass("container-img-nextBtn-enable");
	 }
	 
	 me.fire("change", me.getDate());
	 
 }
 
 
 Calendar.prototype.getDate=function(){
   var me=this;
   var result=me.date.slice(me.index*7,me.index*7+7);
   return result;
 }
 
 EventUtil.extend(Calendar);
