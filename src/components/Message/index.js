import Notification from '../notification';
const prefixCls = 'w-message';
const prefixKey = 'w_message_key_';

let messageInstance;

function getMessageInstance(){

    messageInstance = messageInstance || Notification.newInstance({
        prefixCls: prefixCls
    });
    return messageInstance;
}

function notice({duration = 1.5,content=''}){
    let instance = getMessageInstance();
    instance.notice({
        content,
        duration
    });
}

export default {
    info(options){
        return notice(options);
    }
}
