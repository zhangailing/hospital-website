/**
 * 
 */
function Schedule(options){
	var me=this;
	me.element = $(options.element);
	me.doctor=options.doctor;
	me.schedule=me.doctor.schedule;
	me.toolTip = $("<div class='schedule-tooltip' style='display:none;'><span style='color:#aaa;'>挂号费</span><span class='fee' style='color:#059981'></span></div>");
	$(document.body).append(me.toolTip);
	me.renderTime();
}
Schedule.prototype.renderTime=function(){
	  var me=this;
	

		me.amcontainer=$("<ul class='schedule-am'></ul>");
		me.pmcontainer=$("<ul class='schedule-pm'></ul>");
		me.amtext=$("<li class='li-amtext'>上午</li>");
		me.pmtext=$("<li class='li-pmtext'>下午</li>");
		
		
		me.amcontainer.append(me.amtext);
		me.pmcontainer.append(me.pmtext);
		for(var i=0;i<7;i++){
			me.amli=$("<li class='schedule-disable'></li>");
			me.pmli=$("<li class='schedule-disable'></li>");
			$(me.amcontainer).append(me.amli);
			$(me.pmcontainer).append(me.pmli);
		}

		me.element.append(me.amcontainer).append(me.pmcontainer);
		me.element.on('mouseover mouseout','li.schedule-disable',function(event){
			var target = $(event.target);
			if(event.type=="mouseover" && target.hasClass("schedule-enable")){
				target.addClass("schedule-enable-hover");
				var fee = (target.attr("fee")-0).toFixed(2);//保留两位小数点
				fee = "￥"+fee+"元";
				var offset = target.offset();
				me.toolTip.find(".fee").html(fee);
				me.toolTip.css({
					display:'block',
					left:offset.left + 25 - 83 + "px",
					top:offset.top + 53 + "px"
				});
			}else{
				target.removeClass("schedule-enable-hover");
				me.toolTip.css({
					display:'none'
				});
			}
		});
		
	}
Schedule.prototype.updateDate=function(dates){
	var me=this;
	//清除添加的class
	me.amcontainer.find('li.schedule-disable').removeClass('schedule-enable schedule-booked schedule-out-service');
	me.pmcontainer.find('li.schedule-disable').removeClass('schedule-enable schedule-booked schedule-out-service')
	
	//利用日期时间查找符合时间的医生排班
	for(var i=0;i<dates.length;i++ ){
		var dateStr=dates[i].dateStr;
		for(var j=0;j<me.schedule.length;j++){
			var sd=me.schedule[j].date.substring(5,10);
			var type=me.schedule[j].type;
			var status=me.schedule[j].status;
			var fee = me.schedule[j].fee;
			if(sd==dateStr){
				if(type=='上午'){
				    var li=me.amcontainer.find('li.schedule-disable')[i];	
				}
                else if(type=='下午'){
					var li=me.pmcontainer.find('li.schedule-disable')[i];
				}
				var cls='';
				if(status==1){
					cls='schedule-enable';
				}else if(status==2){
					cls='schedule-booked ';
				}else if(status ==3){
					cls='schedule-outer-service';
				}
				$(li).addClass(cls).attr("fee",fee);
			}
		}
	}
}
