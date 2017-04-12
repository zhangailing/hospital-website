/**
 * 
 */
requirejs.config({
	baseUrl : '',
	
	paths : {
		render:'js/render'
	}
});
/**
 * Amd程序主函数
 */
require(['render'], function(RenderService){
	RenderService.init();
});