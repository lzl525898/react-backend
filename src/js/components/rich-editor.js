import React from 'react';
import LzEditor from 'react-lz-editor';

class RichEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        content:
         this.props.defaultString
         ?
          this.props.defaultString
         :
          `<pre><code>这个人很懒，还没有任何关于自己的描述~</code></pre>`
      };
      this.receiveHtml = this.receiveHtml.bind(this);
    };
    receiveHtml(content) {
      console.log("Recieved content", content);
    };
    render() {
      const uploadConfig = {
        QINIU_URL: "http://up.qiniu.com", //上传地址，现在暂只支持七牛上传
        QINIU_IMG_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do", //请求图片的token
        QINIU_PFOP: {
          url: "http://www.yourServerAddress.mobi/doQiniuPicPersist.do" //七牛持久保存请求地址
        },
        QINIU_VIDEO_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do", //请求媒体资源的token
        QINIU_FILE_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do?name=patch", //其他资源的token的获取
        QINIU_IMG_DOMAIN_URL: "https://image.yourServerAddress.mobi", //图片文件地址的前缀
        QINIU_DOMAIN_VIDEO_URL: "https://video.yourServerAddress.mobi", //视频文件地址的前缀
        QINIU_DOMAIN_FILE_URL: "https://static.yourServerAddress.com/", //其他文件地址前缀
      }
      return(
        <LzEditor
          active={true}
          importContent={this.state.content}
          cbReceiver={this.receiveHtml}
          uploadConfig={uploadConfig}
          fullScreen={false}
          color={false}
           convertFormat="html"
        />
      )
    }
}
export default RichEditor;
