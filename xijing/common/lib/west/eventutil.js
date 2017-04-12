/**
 * Created by Zhang on 2017/4/12.
 */
(function(){
    var EventUtil = {
        initEvent:function(){
            if(!this.eventMap){
                //����һ���ڲ���js�������ڴ洢�ⲿ���¼�
                this.eventMap = {

                }
                //ά���¼�����Ψһ��־λ
                this.eventIndex = 1;
            }
        },
        //������ڲ���eventMap����ע���¼����������ҷ����¼�id�����������¼�ɾ������ʱʹ��
        on:function(ename,fn){
            var me = this;
            me.initEvent();
            var cache = me.eventMap[ename];
            if(!cache){
                cache = me.eventMap[ename] = [];//��ͬһ�����¼�����һ�����������������
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
            var args = Array.prototype.slice.call(arguments,1);//��arguments�ĵڶ�����ʼȡ��ֱ�����һλ
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