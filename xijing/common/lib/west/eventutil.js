/**
 * Created by Zhang on 2017/4/12.
 */
(function(){
    var EventUtil = {
        initEvent:function(){
            if(!this.eventMap){
                //创建一个内部的js对象，用于存储外部绑定事件
                this.eventMap = {

                }
                //维护事件索引唯一标志位
                this.eventIndex = 1;
            }
        },
        //往组件内部的eventMap属性注入事件函数，并且返回事件id，供后续有事件删除需求时使用
        on:function(ename,fn){
            var me = this;
            me.initEvent();
            var cache = me.eventMap[ename];
            if(!cache){
                cache = me.eventMap[ename] = [];//将同一类型事件放在一个数组里，按索引区分
            }
            var eventId = me.eventIndex;
            cache.push({
                eventId:eventId,
                fn:fn
            });
            me.eventIndex++;
            return eventId;
        },
        fire:function(ename){
            var me = this;
            me.initEvent();
            var cache = me.eventMap[ename];
            if(!cache){
                return;
            }
            var args = Array.prototype.slice.call(arguments,1);//从arguments的第二个开始取，直到最后一位
            for(var i=0;i<cache.length;i++){
                cache[i].fn.apply(me,args);
            }
        },
        extend:function(fn){
            for(var p in EventUtil){
                fn.prototype[p] = EventUtil[p];
            }
        }
    }
    window.EventUtil = EventUtil;
})()