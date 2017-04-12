/**
 * 
 */
define(function(){
	var renderService = {};
	
	renderService.init = function(){
		var calendar = new Calendar({
			element :'.calendar-container',
			startDate: new Date(),
			interval :21
		});
		calendar.renderCalendar(calendar.getDates());

	}
	
	return renderService;
})