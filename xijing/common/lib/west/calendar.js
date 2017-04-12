/**
 * 
 */
function Calendar(options){
	var me = this;
	me.element = $(options.element);
	me.startDate = options.startDate;
	me.interval = options.interval||7;
	me.date = me.getDates();//缓存日历数组
	me.index = 0;
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
	var me = this;
	if((me.interval%7)!=0){
		console.log("时间跨度应是7的倍数");
	}
	var result = [];
	var time = me.startDate.getTime();//缓存从1970年1月1日至起始日期的毫秒数，为后面按天new day做准备
	for(var i=0;i<me.interval;i++){
		//取值
		var date = new Date(time+ i * 24*60*60*1000);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var week = me.getWeekName(date.getDay());
		//检验
		month = month < 10 ? '0'+ month :　month;
		day = day < 10 ? '0'+ day :　day;
		//构造
		result.push({
			date:year+'-'+month+'-'+day,
			dateStr:month+'/'+day,
			weekName:week
		})
	}
	return result;
}
Calendar.prototype.getWeekName = function(day){
	var weekName = ["周日","周一","周二","周三","周四","周五","周六"];
	return weekName[day];
}
//构造日历组件，并绑定事件
Calendar.prototype.renderCalendar = function(options){
	var me = this;
	me.lastBtn = $("<div class='calendar-last-btn container-lastBtn-disable'></div>");
	me.nextBtn = $("<div class='calendar-next-btn container-nextBtn-enable'></div>");
	me.ul = $("<ul class='container-ul'>");
	for(var i=0;i<7;i++){
		me.li = $("<li class='container-ul-li'>"
			+"<div class='container-date'>"+me.date[i].dateStr+"</div>"
			+"<div class='container-week'>"+me.date[i].weekName+"</div>"
			+"</li>"
			)
		me.ul.append(me.li);
	}
	me.element.append(me.lastBtn).append(me.ul).append(me.nextBtn);
	//由于事件只绑定一次，故在此绑定
	me.lastBtn.on("click",function(event){
		//判断不可点击的状态
		if(!me.lastBtn.hasClass("container-lastBtn-enable")){
			return;
		}
		me.index--;
		me.changeStatus();
		me.changeDay();
		me.getDate();
	});
	me.nextBtn.on("click",function(event){
		if(!me.nextBtn.hasClass("container-nextBtn-enable")){
			return;
		}
		me.index++;
		me.changeStatus();
		me.changeDay();
		me.getDate();
	});
	me.lastBtn.on("mouseover mouseout",function(event){
		if(event.type == 'mouseover'){
			if(me.lastBtn.hasClass("container-lastBtn-enable")){
				me.lastBtn.addClass("container-lastBtn-hover");
			}
		}else{
			me.lastBtn.removeClass("container-lastBtn-hover");
		}
	});
	me.nextBtn.on("mouseover mouseout",function(event){
		if(event.type == 'mouseover'){
			if(me.nextBtn.hasClass("container-nextBtn-enable")){
				me.nextBtn.addClass("container-nextBtn-hover");
			}
		}else{
			me.nextBtn.removeClass("container-nextBtn-hover");
		}
	});
	
}
//更换日期
Calendar.prototype.changeDay = function(){
	var me = this;
	var dateDom = me.element.find(".container-date");
	var weekDom = me.element.find(".container-week");
	for(var i = 0;i<7;i++){
		if(i + me.index * 7 < me.interval){
			$(dateDom[i]).html(me.date[i + me.index * 7].dateStr);
			$(weekDom[i]).html(me.date[i + me.index * 7].weekName);
		}
	}
}
//更换状态
Calendar.prototype.changeStatus = function(){
	var me = this;
	//添加右按钮的状态变化
	if(me.index==0&&me.lastBtn.hasClass('container-lastBtn-enable')){
		me.lastBtn.removeClass("container-lastBtn-enable");
		me.lastBtn.removeClass("container-lastBtn-hover");
	}else{
		me.lastBtn.addClass("container-lastBtn-enable");
	}
	//添加左按钮的状态变化
	if(me.index==(me.interval/7)&&me.nextBtn.hasClass('container-nextBtn-enable')){
		me.nextBtn.removeClass("container-nextBtn-enable");
		me.nextBtn.removeClass("container-nextBtn-hover");
		me.nextBtn.addClass("container-nextBtn-disable");
	}else{
		me.nextBtn.addClass("container-nextBtn-enable");
	}
	me.fire("change",me.getDate());
}
Calendar.prototype.getDate = function(){
	var me = this;
	var result = me.date.slice(me.index*7,me.index*7+7);
	return result;
}
EventUtil.extend(Calendar);


