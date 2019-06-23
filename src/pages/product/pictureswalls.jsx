import { Upload, Icon, Modal, message } from 'antd';
import React from 'react'
import {reqDeleteImg} from '../../api'
import PropTypes from 'prop-types'
import {BASE_IMG_URL} from '../../utils/constants'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {

    static propTypes = {
        imgs:PropTypes.array
    }

  state = {
    previewVisible: false,//是否显示大图
    previewImage: '',//大图显示地址
    fileList: [
      /* {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }, */
    ],//所有已上传的图片信息 点击修改用  点击详情用
  };

  getImgs = ()=>{
      return this.state.fileList.map(file =>file.name)
  }

  //关闭大图预感
  handleCancel = () => this.setState({ previewVisible: false });
  
  /* 
    大开大图预览
  */
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  /* 
  检测上传上传中，完成，失败都会用这个函数
  */
  handleChange = async ({ file ,fileList }) => {
 
    console.log('handleChange()',file.status,file)
    if(file.status === 'done'){
        const result = file.response
        if(result.status === 0){
            const name = result.data.name
            const url = result.data.url
            fileList[fileList.length-1].name = name
            fileList[fileList.length-1].url  = url
        }
    } else if(file.status === 'removed'){
        const result = await reqDeleteImg (file.name)
        if(result.status === 0){
            message.success('图片删除成功')
        } else {
            message.error('图片删除失败')
        }
    }

    this.setState({ fileList })
  };

  /* 
  当点击修改时设置状态
  */
  componentWillMount(){
    const {imgs} = this.props
    console.log(imgs)
    if(imgs && imgs.length>0){
        const fileList = imgs.map((img,index)=>({
            uid:-index+'',
            name:img,
            status:'done',
            url: BASE_IMG_URL +img,   
        }))
        this.setState({fileList})
    }
    
    
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div >Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          name='image'
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

