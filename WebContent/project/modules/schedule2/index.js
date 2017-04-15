/**
 * 
 */
requirejs.config({
	baseUrl : '../../modules/schedule2/',
	
	paths : {
		text:'../../common/lib/requirejs/text',
		render:'js/render',
		datasource:'js/datasource'
	}
});
/**
 * Amd程序主函数
 */
require(['render'], function(RenderService){
	RenderService.init();
});